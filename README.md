<h2>Universidad Nacional de las Artes <br>
Lic. en Artes Multimediales <br>
Informatica General 1- Drelichman TM <br>
2026 <br>
Dorgan (44448957), Hochnadel (31481155), La Rosa () <br></h2>

<h2>Documentación del proceso</h2>

<p>  El proyecto comenzó con un encuentro presencial donde pensamos los diferentes juegos que teníamos planeado hacer y también nos decidimos por dividir las diferentes partes del trabajo de la manera más equitativa posible. Por un lado Gabriella se encarga del juego de cartas y la página de puntajes; por otro lado Anita realiza el juego de dados, al igual que el índex y la estructura HTML principal de las páginas (nav, header, footer, etc.). Finalmente Mav se ocupa de el juego de preguntas, la página de información personal y el css general de todas las páginas. Luego de este encuentro cada una comenzó a trabajar por su cuenta, pero manteniendo la comunicación si se necesitaba una ayuda.<p/>

<h3>Página de preguntas:</h3>

<p> La creación de la página de preguntas comenzó a partir de una conversación con la inteligencia artificial (ChatGPT), utilizada como herramienta de apoyo para descomponer la idea inicial en diferentes etapas. A partir de esta conversación se elaboró un diagrama de flujo que permitió establecer una línea general de funcionamiento y utilizarla como una especie de pseudocódigo para dividir el desarrollo en partes más simples. Durante este proceso, la idea original fue modificándose a medida que se analizaban las posibilidades técnicas y los objetivos del juego. </p>

<p> La propuesta inicial consistía en una trivia de 10 preguntas en la que se mostraba una bandera y el jugador debía identificar a qué país pertenecía. Posteriormente, esta idea se modificó para que la cantidad de preguntas no estuviera fijada de antemano, sino que dependiera de la cantidad de países disponibles. Al mismo tiempo, se incorporó un sistema de tres vidas: cada respuesta incorrecta resta una vida, mientras que cada respuesta correcta suma 100 puntos. De esta manera, la partida puede finalizar de dos formas diferentes: cuando el jugador pierde las tres vidas o cuando logra responder correctamente todos los países disponibles. En el primer caso, el puntaje depende de la cantidad de respuestas correctas obtenidas antes de perder; en el segundo, el jugador alcanza el puntaje máximo posible. Este cambio hizo que la lógica del juego fuera más compleja, pero también permitió desarrollar un sistema de puntuación y finalización más dinámico. </p>

<p> El primer paso de programación consistió en aprender a realizar correctamente las consultas a la API y a recuperar la información de los países. Como la API devuelve los datos en grupos, fue necesario realizar varias consultas utilizando el parámetro <code>offset</code> para avanzar por los distintos grupos de países. Cada respuesta obtenida era recorrida mediante <code>forEach()</code> y los países se iban incorporando a un array general. Una vez finalizada la carga, se recorrieron nuevamente los datos para conservar solamente los países que tenían una URL de bandera disponible. De esta manera se obtuvo el conjunto de países que podía utilizarse para generar las preguntas. </p>

<p> Una vez resuelta la carga de información, se desarrolló la función encargada de generar cada pregunta. Primero se crea un array de países disponibles y se selecciona aleatoriamente uno de ellos como respuesta correcta utilizando <code>Math.random()</code> y <code>Math.floor()</code>. Este país se guarda en una variable para conservar la referencia a la respuesta correcta y, además, se incorpora al array <code>paisesUsados</code>. Luego se seleccionan otros tres países de manera aleatoria para utilizarlos como opciones incorrectas. Para evitar que una misma opción incorrecta aparezca dos veces dentro de una pregunta, se comprueba que cada país seleccionado no esté repetido y que tampoco sea el país correcto. </p>

<p> Después de obtener las cuatro opciones, se utiliza la función <code>mezclar()</code>, basada en <code>sort()</code>, para cambiar aleatoriamente el orden de los países. Esto permite que la respuesta correcta no aparezca siempre en la misma posición. Como el país utilizado como respuesta correcta no debe volver a ser seleccionado como correcto en una pregunta posterior, se creó el array <code>paisesUsados</code> y una función para buscar solamente los países que todavía están disponibles. Los países utilizados como opciones incorrectas pueden volver a aparecer posteriormente, ya que solamente se evita repetir un país cuando fue utilizado como respuesta correcta. </p>

<p> Una vez que la generación de preguntas estuvo funcionando, se incorporó la interacción con el jugador. Cada una de las cuatro opciones se genera dinámicamente como un botón y utiliza el nombre del país como referencia para comprobar la respuesta seleccionada. Al hacer clic sobre una opción, un <code>if</code> compara el nombre del botón con el nombre del país correcto. Si la respuesta coincide, se suman 100 puntos. Si no coincide, se resta una vida. Después de responder, los cuatro botones quedan deshabilitados para impedir que el jugador pueda seleccionar más de una opción en la misma pregunta. </p>

<p> También se incorporó un contador de progreso para indicar el número de pregunta en el que se encuentra el jugador, junto con la cantidad de vidas y el puntaje acumulado. Una vez respondida una pregunta, aparece el botón para pasar a la siguiente. Al utilizarlo, se genera nuevamente una pregunta y se reemplazan las opciones anteriores. </p>

<p> Para mejorar la respuesta visual del juego, se agregaron clases CSS a los botones según el resultado de la respuesta. Cuando el jugador selecciona la opción correcta, el botón recibe la clase <code>triviaCorrecto</code>; cuando selecciona una respuesta incorrecta, recibe la clase <code>triviaIncorrecto</code> y, al mismo tiempo, se marca la opción correcta. De esta manera, el jugador puede identificar visualmente qué respuesta era la correcta. Los botones quedan deshabilitados después de responder para mantener visible este resultado. </p>

<p> El siguiente paso fue incorporar las condiciones de finalización. Se estableció que la partida debe terminar cuando el jugador llega a cero vidas o cuando la cantidad de países utilizados como respuestas correctas coincide con la cantidad de países disponibles para el juego. Cuando ocurre alguna de estas situaciones, dejan de generarse nuevas preguntas y se muestra la sección final. El mensaje mostrado cambia según la causa de finalización: se informa que se terminaron las vidas o que se lograron adivinar todos los países. En esta sección también se muestra el puntaje final y se habilita un formulario para que el jugador pueda guardar su nombre y su resultado. </p>

<p> Finalmente, se incorporó la posibilidad de guardar los resultados utilizando <code>localStorage</code>. El nombre y el puntaje del jugador se almacenan en un objeto y los resultados de las distintas partidas se guardan dentro de un array. Para evitar que los datos de esta trivia se mezclen con los de otros juegos del sitio, la clave utilizada en <code>localStorage</code> se identifica como <code>triviaResultados</code>. Al comenzar una nueva partida, se reinician las vidas, el puntaje, el número de pregunta y la lista de países utilizados, mientras que los resultados almacenados anteriormente permanecen guardados. </p>

<p> El último paso consistió en ensamblar todas las partes en una única experiencia de juego. Al ingresar a la página se muestra la sección de inicio con las instrucciones. Cuando el jugador presiona el botón <strong>Comenzar</strong>, se oculta esta sección y comienza la carga de los datos desde la API. Mientras se realiza la consulta se muestra el mensaje <strong>Cargando preguntas...</strong>. Una vez obtenidos y procesados los datos, se genera la primera pregunta y comienza la partida. Al finalizar, se oculta la sección de juego y se muestra la sección final, donde se presenta el resultado, se permite guardar el nombre y el puntaje y se ofrece la opción de reiniciar la partida sin necesidad de volver a cargar la página. </p>

<h4>Uso de la API</h4>

<p> Para desarrollar la trivia se utilizó la API <strong>REST Countries</strong> (<a href="https://restcountries.com/">https://restcountries.com/</a>). Esta API proporciona información sobre distintos países, entre ella su nombre, bandera, capital, región, población y otros datos. Para este proyecto se utilizaron principalmente el nombre del país en español y la URL correspondiente a su bandera. </p>

<p> La consulta a la API se realiza mediante JavaScript utilizando <code>fetch()</code> y el endpoint <code>https://api.restcountries.com/countries/v5</code>. La solicitud utiliza una API Key incluida en el encabezado <code>Authorization</code> mediante el formato <code>Bearer</code>. Como la información no se obtiene en una única respuesta, se realizan varias consultas utilizando el parámetro <code>offset</code> para avanzar por los distintos grupos de resultados. La cantidad de países solicitados en cada consulta está determinada por el límite establecido por la API. </p>

<p> Cada respuesta recibida contiene una colección de objetos correspondientes a distintos países. Estos objetos son recorridos mediante <code>forEach()</code> y se incorporan al array utilizado por el juego. Posteriormente, los países son recorridos nuevamente para comprobar que tengan disponible una URL de bandera. De esta forma, se genera un conjunto de países aptos para ser utilizados en la trivia. </p>

<p> Los datos obtenidos no se utilizan directamente para mostrar toda la información disponible en la API, sino como fuente para construir las preguntas. JavaScript utiliza el nombre del país en español para generar las cuatro opciones de respuesta y utiliza la URL de la bandera del país seleccionado para mostrar la imagen que el jugador debe identificar. La generación de la pregunta, la selección de las opciones, la mezcla de respuestas y el control de repetición se realizan mediante funciones desarrolladas específicamente para el juego. </p>

<p> De esta manera, la API funciona como fuente externa de información, mientras que JavaScript se encarga de procesar esos datos y transformarlos en la dinámica de preguntas, respuestas, vidas y puntaje que conforma la trivia. </p>

<h3>Juego de cartas — Memotest</h3>

<p>
    El juego consiste en un memotest de temática naturaleza. El jugador debe encontrar
    todas las parejas de cartas iguales, eligiendo un nivel de dificultad que determina
    la cantidad de cartas del tablero.
</p>

<h4>Estructura HTML</h4>

<p>Se creó la estructura de la página del juego, incluyendo:</p>

<ul>
    <li>Una sección de presentación con las instrucciones.</li>
    <li>Un formulario para ingresar el nombre del jugador y seleccionar el nivel.</li>
    <li>Un botón para comenzar la partida.</li>
    <li>Una sección con los datos de la partida: intentos, parejas encontradas y nivel elegido.</li>
    <li>Un contenedor para generar las cartas dinámicamente.</li>
    <li>Un botón para reiniciar el juego.</li>
</ul>

<p>El nivel se selecciona mediante un <code>select</code> con tres opciones:</p>

<ul>
    <li>Fácil: 6 pares (12 cartas).</li>
    <li>Medio: 8 pares (16 cartas).</li>
    <li>Difícil: 10 pares (20 cartas).</li>
</ul>

<h4>Generación del mazo</h4>

<p>
    En JavaScript se creó la función <code>generarMazo()</code>, que genera las cartas
    según la cantidad de pares seleccionada. Se utiliza un <code>while</code> para
    completar el mazo y <code>Math.random()</code> junto con <code>Math.floor()</code>
    para seleccionar imágenes al azar. También se controla que cada imagen aparezca
    como máximo dos veces para formar las parejas.
</p>

<p>
    Cada carta se guarda en un array aparte como un objeto con un identificador de imagen
    (el número de la imagen), la ruta de la imagen y el estado de la pareja
    (<code>true</code> si se encontró y <code>false</code> si aún no).
</p>

<h4>Inicio de la partida</h4>

<p>
    Al presionar <strong>“Comenzar partida”</strong>, se obtiene el nombre y el nivel
    seleccionado mediante <code>querySelector()</code>. Se utiliza <code>trim()</code>
    para eliminar los espacios al principio y al final del nombre y comprobar que el
    jugador realmente haya ingresado un nombre.
</p>

<p>
    Antes de comenzar se verifica que el jugador haya ingresado un nombre y seleccionado
    un nivel. Si alguna de estas condiciones no se cumple, se muestra un mensaje y la
    partida no comienza.
</p>

<p>
    Mediante un <code>switch</code> se genera la cantidad de cartas correspondiente al
    nivel elegido. Luego, se utiliza la función <code>crearTablero()</code> para generar
    las imágenes de las cartas dinámicamente mediante <code>createElement()</code>.
    Cada imagen comienza mostrando el dorso de la carta y se agrega al tablero mediante
    <code>appendChild()</code>.
</p>

<p>
    Una vez iniciada la partida, se deshabilita el campo de configuración y se habilita
    el botón de reinicio.
</p>

<h4>Interacción con las cartas</h4>

<p>
    Se agregó la función <code>manejarClickCarta()</code>, que controla qué sucede
    cuando el jugador selecciona una carta. Al hacer click, se muestra la imagen
    correspondiente y se guarda su posición para poder identificarla dentro del array
    <code>cartas</code>.
</p>

<p>
    Se agregaron validaciones para evitar seleccionar una carta que ya forma parte de
    una pareja, seleccionar la misma carta dos veces o seleccionar una tercera carta
    mientras todavía se están comparando dos cartas.
</p>

<p>
    Cuando se seleccionan dos cartas, se incrementa el contador de intentos y se
    comparan sus identificadores de imagen. Si coinciden, se marcan como pareja
    encontrada, permanecen visibles y se les agrega la clase <code>encontrada</code>
    para diferenciarlas mediante CSS. Si no coinciden, las cartas vuelven a mostrar
    el dorso después de 3 segundos.
</p>

<p>
    Mientras las cartas que no coinciden permanecen visibles, se bloquean nuevos
    clicks para evitar que el jugador seleccione otras cartas durante ese tiempo.
</p>

<h4>Finalización de la partida</h4>

<p>
    Se agregó la función <code>comprobarFinDePartida()</code>, que verifica si se
    encontraron todas las parejas comparando la cantidad de parejas encontradas con
    la mitad del total de cartas.
</p>

<p>
    Cuando el jugador completa el tablero, la variable <code>partidaGanada</code> pasa
    a <code>true</code> y se muestra un mensaje indicando la cantidad de intentos
    realizados y que puede reiniciar el juego para guardar los datos de la partida
    actual.
</p>

<h4>Guardado de récords</h4>

<p>
    Se agregó la función <code>guardarRecord()</code>, que permite guardar el mejor
    resultado obtenido para cada nivel. Para esto se utiliza <code>localStorage</code>,
    que permite conservar la información en el navegador.
</p>

<p>
    Los datos se guardan en un objeto utilizando <code>JSON.stringify()</code> y se
    recuperan mediante <code>JSON.parse()</code>. Para cada nivel se almacena el nombre
    del jugador y la cantidad de intentos del mejor resultado. Si ya existe un récord,
    solo se reemplaza cuando la nueva partida se completa con una menor cantidad de
    intentos.
</p>

<h4>Reinicio</h4>

<p>
    El botón <strong>“Reiniciar juego”</strong> elimina las cartas del tablero,
    reinicia los contadores y vuelve a habilitar el formulario para comenzar una
    nueva partida.
</p>

<p>
    Antes de reiniciar se cancela cualquier temporizador pendiente mediante
    <code>clearTimeout()</code>. Si la partida fue completada, se guarda el récord
    correspondiente antes de restablecer los datos de la partida.
</p>

<p>
    Además, al reiniciar se restablecen los arrays y variables utilizados durante la
    partida, incluyendo las cartas, las cartas seleccionadas, los intentos, las parejas
    encontradas y el estado de la partida. También se limpian el nombre y el nivel
    seleccionados anteriormente.
</p>

<h4>Página de puntajes y guardado de récords</h4>

<p>
    La página de puntajes lee y muestra el récord de cada juego desde `localStorage`, donde cada uno guarda su resultado bajo una clave distinta (`recordsCartas`, `recordDados`, `triviaResultado`), convertido a texto con `JSON.stringify` y reconstruido con `JSON.parse` al leerlo. El memotest guarda un objeto con un récord por nivel de dificultad (jugador e intentos), porque cada nivel tiene una cantidad distinta de pares; dados y trivia guardan un único récord general (jugador y mejor resultado), ya que no se dividen en categorías. La tabla de records del memotest se genera dinámicamente con `createElement`, recorriendo los tres niveles y mostrando un guion medio en las columnas sin récord; los récords de dados y trivia, al ser un único valor, se muestran como texto simple, con el mensaje por defecto del HTML si todavía no hay nada guardado.
</p>

<h3>Diseño CSS</h3>
<p>Para realizar el código CSS del proyecto se buscó crear una única hoja de estilos que pudiera utilizarse en las diferentes páginas y juegos. Primero se establecieron los estilos generales del sitio, como los márgenes, fondos, tipografías y colores, buscando mantener una estética visual coherente. También se utilizó Flexbox para organizar los principales elementos de la página y unidades relativas como rem y % para favorecer la adaptación a distintos tamaños de pantalla.</p>

<p>A medida que se desarrollaron los juegos, se identificaron elementos que podían compartir estilos para evitar repetir código. Por ejemplo, se creó la clase .botonLargo para los botones principales de comenzar y reiniciar, .formularioJuego para los formularios y .stats para los indicadores de información de los juegos. De esta manera, un mismo estilo puede aplicarse a distintos elementos sin depender de un ID específico.</p>

<p>Para cada juego se agregaron también estilos particulares según sus necesidades. En Trivia se diseñaron las secciones de inicio, juego y resultado, las opciones de respuesta, la bandera y los indicadores de vidas y puntos. En Memotest se trabajó principalmente en la organización del tablero mediante CSS Grid, buscando que todas las cartas mantuvieran un tamaño uniforme.</p>

<p>Finalmente, se revisó el código para simplificarlo y eliminar reglas repetidas. Este proceso permitió reutilizar estilos entre las diferentes páginas y juegos, mantener una estética uniforme y facilitar futuras modificaciones o la incorporación de nuevos elementos al proyecto.</p>

<h3>Página index.html</h3>

<p>En el desarrollo de la página principal, el index.html, lo primero que se hizo fue pensar a partir de la estructura que se le quería dar. Para que la página se vea de una manera clara e intuitiva, precisa y fácil de navegar para cualquier persona, se partió de un esqueleto con base técnica sencilla. Dentro del HEAD se ubicaron los metadatos, el título sencillo de JUEGOS, la vinculación a la api de google fonts y la vinculación a la hoja de estilos. Lo primero que vemos en el BODY del index.html es el HEADER dónde se puede ver del lado izquierdo un H1 como marca o nombre principal de la página para que sea reconocible fácil. En el centro del header ubicamos el NAV con las páginas de los juegos y puntajes horizontalmente, para que el usuario pueda elergir a que juego entrar siendo éste el tema escencial de la página, sumado a la página de puntajes de todos los juegos. Por último, del lado de la derecha se ubica la página información donde figuran los datos de las desarroladoras del sitio. Para que éste header se vea de ésta manera se colocó el h1 del header en un DIV, el nav de las páginas de los juegos y puntajes en otro DIV y por último se separó del nav la página de información y se colocó en un tercer DIV. Luego proseguimos con el MAIN del body, el cual se dividió en dos SECTION. En el primer section tenemos un H2 con un cartel de bienvenida y un P (párrafo) con la explicación de lo que se trata el sitio. En el segundo section vamos a encontrar un h2 preguntando a que quiere jugar el usuaruio, luego dentro de un div tres ARTICLES con un H3 y un párrafo cada uno donde encontramos el nombre de cada juego y una breve explicación. Por último, pero no menos importante, encontrams el FOOTER, el contenido de pie de página con información pertinente al tp, materia y Universidad y los apellidos de las desarrolladoras con un link a la página de información.html invitando al usuario a conocer el equipo.</p>  

<h3>Página de Dados</h3>

<p>aca todo el proceso html</p>
<p>aca todo el proceso del js</p>


<h3>Declaración del uso de IA</h3>

 <p> Antes de empezar el proyecto se utilizó la inteligencia artificial ChatGPT de manera grupal para generar ideas que podíamos utilizar en los juegos. Se le pidió que genere varios juegos de cada tipo programables con el nivel que manejamos (del cual conoce por entrenamiento previo) y que estos sean de dificultad media o alta. Entre estas ideas decidimos tomar el memotest y el juego de dados parecido al blackjack, el cual modificamos un poco para agregarle una complejidad y un mejor sistema de puntaje. </p>
  
<h4>Mav Dorgan:</h4>
<p>Declaro el uso de Inteligencia Artificial a través de la aplicación ChatGPT. La IA fue utilizada en primer lugar como ayuda para deconstruir la página en pseudocódigo a modo de guía y buscar mejorar la idea original. Luego se le encargó la lectura del documento de la API para sacar los términos y puntos principales, y saber realizar el pedido correctamente. </p>

<p>En cuanto a la hora de programar, fue utilizada como un apoyo secundario para resolver problemas cuando no se podían resolver errores en el código Js por propia cuenta, evitando gastar tiempo innecesario resolviendo un mismo problema. Por ejemplo, se consultó cómo realizar correctamente la paginación de la API mediante el parámetro <code>offset</code>, cómo evitar que se repitiera un país como respuesta correcta, y cómo utilizar <code>localStorage</code> para conservar los puntajes de distintas partidas sin sobrescribir los datos anteriores. </p>

<p> También se utilizó como herramienta de revisión y explicación del código. Ante un error, primero se intentó resolver el problema de manera independiente y, cuando no se encontraba una solución, se consultaba a la IA para identificar la causa y comprender una posible solución. Por ejemplo, ante problemas relacionados con la generación de las cuatro opciones de respuesta, se utilizó ChatGPT para analizar el funcionamiento de las funciones y detectar errores en la lógica. </p> En todos los casos primero se escribió el código por mi cuenta y luego utilizaba la IA en caso de encontrar un obstáculo que no se podía resolver.</p>

<h4>Gabriella La Rosa:</h4>
<p>
    Declaro el uso de Inteligencia Artificial a través de las aplicaciones ChatGPT y Claude.
    <strong>ChatGPT:</strong> La utilicé para la redacción de la documentación y de esta declaración,
    la organización de las ideas del juego, la definición de sus funcionalidades y la división del
    problema general en etapas para facilitar la programación. También generé un pseudocódigo que
    me sirvió para orientarme y estructurar el paso a paso del algoritmo.
    <strong>Claude:</strong> La usé para comprender conceptos, consultar dudas y analizar posibles
    errores en el código. También sirvió como apoyo para explorar distintas formas de resolver los
    problemas que surgían durante el desarrollo. Además, la utilicé para generar comentarios
    en partes del código donde se me había pasado agregarlos, editar los textos de los commits para
    que quedaran más claros y mejor redactados, y detectar y corregir posibles bugs que quedaron
    luego de haber escrito el código.
</p>

<h4>Declaración de uso de la IA Ana Clara Hochnadel</h4>
