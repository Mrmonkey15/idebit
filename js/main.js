(function() {
    const calculateBtn = document.getElementById('calculate');
    const clearBtn = document.getElementById('clean');
    const newDebitBtn = document.getElementById('refresh');
    const mainContainer = document.getElementById('content');
    const returnContainer = document.getElementById('return');
    const copyTxt = document.getElementById('copy');
    const returnTxt = document.getElementById('returnText');
    const loaderArea = document.getElementById('loaderArea');

    // Evento de calcular
    calculateBtn.addEventListener('click', function() {
        const username = document.getElementById('client').value;
        const carId = document.getElementById('carId').value;
        const debt = document.getElementById('fee').value;
        const debtDays = document.getElementById('days').value;
        const referenceMonth = document.getElementById('month').value;
        const referenceYear = document.getElementById('year').value;

        // Validação simples para verificar se todos os campos obrigatórios estão preenchidos
        if (!username || !debt || !debtDays || !referenceMonth || !referenceYear) {
            alert("Por favor, preencha todos os campos obrigatórios!");
            return; // Impede a execução do restante do código
        }

        let totalDebit = 0;
        let afterDiscount = 0;
        let lastMonth = "";

        // Loader
        loaderArea.innerHTML = '<div class="d-flex align-items-center gap-2">' +
            '<strong>Carregando...</strong>' +
            '<div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>' +
            '</div>';
        calculateBtn.classList.add('d-none');
        clearBtn.classList.add('d-none');

        // Usando setTimeout para simular o carregamento
        setTimeout(() => {
            totalDebit = calculateDebit(debt, debtDays, totalDebit).toFixed(2);
            afterDiscount = calculateDiscount(totalDebit).toFixed(2);
            lastMonth = getLastMonth(referenceMonth);

            mainContainer.classList.add('d-none');
            returnContainer.classList.remove('d-none');

            returnTxt.textContent = `O débito no valor de R$ ${totalDebit} refere-se a ${debtDays} dias de cobertura, referente ao período entre ${referenceMonth} e ${lastMonth} de ${referenceYear} do veículo placa ${carId}. Lembramos que nossa cobertura é pós-paga, ou seja, você utiliza primeiro e realiza o pagamento depois. Estamos oferecendo 50% de desconto para a quitação do débito, reduzindo o valor para R$ ${afterDiscount}. Tem interesse em um acordo?`;

            loaderArea.innerHTML = ''; 
            calculateBtn.classList.remove('d-none');
            clearBtn.classList.remove('d-none');
        }, 1000); 
    });

    // Evento de limpar
    clearBtn.addEventListener('click', function() {
        document.getElementById('debitForm').reset();
    });

    // Evento novo débito btn
    newDebitBtn.addEventListener('click', () => {
        location.reload();
    });

    // Evento de copiar texto
    copyTxt.addEventListener('click', () => {
        copyToClipboard(returnTxt.textContent); // Copia o conteúdo do elemento
    });

    // FUNÇÕES

    // Cálculo do débito
    function calculateDebit(debt, debtDays, totalDebit) {
        return (parseFloat(debt) / 30) * parseFloat(debtDays);
    }

    // Desconto no débito
    function calculateDiscount(totalDebit) {
        return totalDebit / 2;
    }

    // Obter mês anterior
    function getLastMonth(referenceMonth) {
        const months = {
            "Janeiro": "Dezembro",
            "Fevereiro": "Janeiro",
            "Março": "Fevereiro",
            "Abril": "Março",
            "Maio": "Abril",
            "Junho": "Maio",
            "Julho": "Junho",
            "Agosto": "Julho",
            "Setembro": "Agosto",
            "Outubro": "Setembro",
            "Novembro": "Outubro",
            "Dezembro": "Novembro"
        };
        return months[referenceMonth];
    }

    // Copiar o texto
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Texto copiado para a área de transferência!');
            }).catch(err => {
                console.error('Erro ao copiar texto: ', err);
            });
        } else {
            const tempElement = document.createElement('textarea');
            tempElement.value = text;
            document.body.appendChild(tempElement);
            tempElement.select();
            document.execCommand('copy');
            document.body.removeChild(tempElement);
            alert('Texto copiado para a área de transferência!');
        }
    }
})();
