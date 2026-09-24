Universidad Nacional de las Artes <br>
Lic. en Artes Multimediales <br>
Informatica General 1- Drelichman TM <br>
2026 <br>
Dorgan (44448957), Hochnadel (), La Rosa () <br>

<h2>Documentación del proceso</h2>
<p>  El proyecto comenzó con un encuentro presencial donde pensamos los diferentes juegos que teníamos planeado hacer y también nos decidimos por dividir las diferentes partes del trabajo de la manera más equitativa posible. Por un lado Gabriela se encarga del juego de cartas y la página de puntajes; por otro lado Anita realiza el juego de dados, al igual que el índex y la estructura HTML principal de las páginas (nav, header, footer, etc.). Finalmente Mav se ocupa de el juego de preguntas, la página de información personal y el css general de todas las páginas. Luego de este encuentro cada una comenzó a trabajar por su cuenta, pero manteniendo la comunicación si se necesitaba una ayuda.<p/>

<h3>Página de preguntas:</h3>
<p>  Para la página de preguntas se comenzó por una conversación con la inteligencia artificial (ChatGPT) para ayudar a desarmar la idea en diferentes pasos y un diagrama de flujo que otorgue una linea general o pseudo código y así descomponer el proceso en partes más simples. También a medida que se desarrollaba la conversación se fueron realizando cambios a la idea original para adaptarlo mejor a las posibilidades y los objetivos. La idea original era una trivia de 10 preguntas donde se enseñaba una bandera y se debía adivinar el país; luego se modificó para que el límite de preguntas sean todos los países conseguidos pero que haya un total de 3 vidas que se restan al responder incorrectamente. De esta manera hay dos caminos: perder todas las vidas, donde tu puntaje se da segun la cantidad de preguntas correctas; o adivinar correctamente todos los países y ganar, consiguiendo el puntaje máximo. Esto complejizó el código pero trajo también un sistema de puntaje más interesante. <br>
  Los primeros días consistieron en aprender a hacer el pedido a la API correctamente, cómo pedir una lista completa de países y guardarlos en un array. Pero había un problema, esos países se daban por orden alfabético por lo que se debían mezclar con una función. Luego se genero una función para crear la pregunta. Ésta debía: elegir aleatoriamente el país que se consideraría correcto, guardarlo en una variable para no perderlo, elegir otros 3 países de manera aleatoria para las opciones incorrectas y luego mezclar todas las opciones para que no siempre la primera sea la correcta. Una vez realizada una pregunta, ese país "correcto" no podía volver a aparecer como opción, por lo que se debió crear un array que me indique que paises estan disponibles para usar y otro que diga cuales ya fueron utilizados para no repetirse.
</p>

<h3>Declaración del uso de IA</h3>
- Ayuda para pensar los juegos
- 
<h4>Mav Dorgan:</h4>
<p>Declaro el uso de Inteligencia Artificial a través de la aplicación ChatGPT. La IA fue utilizada en primer lugar como ayuda para deconstruir la página en pseudocódigo a modo de guía y buscar mejorar la idea original. Luego se le encargó la lectura del documento de la API para sacar los términos y puntos principales, y saber realizar el pedido correctamente. En cuanto a la hora de programar, fue utilizada como un apoyo secundario a la hora de resolver problemas, para evitar estar tiempo innecesario resolviendo un mismo problema. Fue utilizada como soporte y ayuda cuando no se podían resolver errores en el código Js por propia cuenta. En todos los casos primero se escribió el código por mi cuenta y luego utilizaba la IA en caso de encontrar un obstáculo que no se podía resolver.</p>
