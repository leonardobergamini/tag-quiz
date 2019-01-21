var Perguntas = function(enunciado, alternativas, alternativaCorreta){
            this.enunciado = enunciado;
            this.alternativas = alternativas;
            this.alternativaCorreta = alternativaCorreta;
}
var perguntas = [];
perguntas.push(new Perguntas("Para o que serve o atributo autofocus?", ["autoplay em vídeos na página", "Declara a codificação da página ou do script", "O elemento automaticamente é focado ao carregar a tela", "Reload na tela"], "O elemento automaticamente é focado ao carregar a tela"));
perguntas.push(new Perguntas("O que a tag <meta charset='utf-8'> significa?", ["Declara a codificação da página ou do script", "Marca texto em itálico", "O texto se torna em negrito", "Representa a legenda de uma imagem"], "Declara a codificação da página ou do script"));
perguntas.push(new Perguntas("Qual a tag que não faz parte da linguagem HTML?", ["animation", "aside", "div", "figcaption"], "animation"));
perguntas.push(new Perguntas("Qual é a diferença de <article> para <p>?", ["Pula uma linha em uma aplicação html", "Representa uma composição em uma aplicação html", "<p> é usado para parágrafo, <article> para citação", "Diferença semântica"], "Representa uma composição em uma aplicação html"));
perguntas.push(new Perguntas("A tag <tr> representa uma...?", ["nova coluna", "nova tabela", "nova linha", "nova lista"], "nova linha"));
perguntas.push(new Perguntas("A tag div a primeira vista não faz diferença visual em nossa aplicação, qual a utilidade dessa tag?", ["Terá utilidade uma vez usada na linguagem CSS ou Javascript", "Organização do código", "Declara que é o rodapé da página", "Nenhuma das alternativas"], "Organização do código"));
perguntas.push(new Perguntas("Qual a diferença de <cite> para <em>?", ["Nenhuma diferença", "Ambos tornam o texto em itálico, mas a tag <cite> é usada somente para citações", "A tag <cite> é somente utilizada na linguagem CSS", "Nenhuma das alternativas"], "Ambos tornam o texto em itálico, mas a tag <cite> é usada somente para citações"));
perguntas.push(new Perguntas("Qual é a função do atributo alt?", ["O alt coloca uma legenda a imagem", "Muda a linguagem para a escolha do usuário", "Utilizada em caso de disfunção visual do usuário", "Torna possível ter um áudio embutido na imagem"], "Utilizada em caso de disfunção visual do usuário"));
perguntas.push(new Perguntas("A tag <ol> e <ul> tem a mesma função, listar itens em seu código. Mas existe uma diferença, qual é?", ["Não existe diferença", "<ol> lista itens aleatoriamente", "<ol> lista em negrito e <ul> em itálico","<ol> lista os itens numerando-os, <ul> lista os itens sem restrição"], "<ol> lista os itens numerando-os, <ul> lista os itens sem restrição"));
perguntas.push(new Perguntas("Qual propriedade faz parte da linguagem HTML?", ["text-align", "align", "class", "classList"], "class"));