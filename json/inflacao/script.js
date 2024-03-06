document.addEventListener("DOMContentLoaded", async function(){  
    const conteudo = document.getElementById("conteudo");

    const resposta = await fetch('https://servicodados.ibge.gov.br/api/v3/agregados/1705/variaveis?view=OLAP&localidades=BR');

    const dados = await resposta.json();   


    dados.forEach(function(inflacao) {       
        const blocoInflacao = document.createElement('div');
        blocoInflacao.classList.add('bloco-inflacao'); // Atribuindo o nome de uma classe
        
        const subtitulo = document.createElement('ul');
        subtitulo.id = "subtitulo";
        
        const liSubtitulo = document.createElement('li');
        liSubtitulo.textContent = `${inflacao.medida} - ${inflacao.unidade}`;

        

        subtitulo.appendChild(liSubtitulo); // Adicionando o item de lista à lista
        blocoInflacao.appendChild(subtitulo); // Adicionando a lista ao bloco
        conteudo.appendChild(blocoInflacao); // Adicionando o bloco ao conteúdo]

        
        const resultados = inflacao.resultados
        
        resultados.forEach(function(resultado){
            const resultadosOL = document.createElement ('ol');
            
            const series = resultado.series;

            series.forEach(function(seriesGeral){
                const serieData = seriesGeral.serie;

                for (const anoMes in serieData){
                const liserie = document.createElement ('li');
                liserie.textContent = `${anoMes} - ${serieData [anoMes]}`;
                resultadosOL.appendChild(liserie)
                conteudo.appendChild(resultadosOL)
                }
            })  
        })
    });
});
