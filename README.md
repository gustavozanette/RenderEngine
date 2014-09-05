Render Engine
============

Gerenciador de Render.
Serve para gerenciar o que eu preciso que esteja renderizando, 
Por exemplo algo que só renderiza enquanto está disparando o evento de scroll,
e outra animação fica renderizando o tempo inteiro


Como Usar
============

//Inicia a classe
var Render = new RenderEngine();
//Cria um objeto para controlar a engine.

var testRender = Render.register( {
  id: "testId",
	update: function() {
	  console.log( '[ RENDER ] updating' );
	}
});


Recomendação
============

Como é utilizado o "requestFrameAnimation" eu recomendo que seja colocado algum tipo de fix.
Paul Irish tem uma solução boa:
http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
