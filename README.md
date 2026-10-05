<h2>Universidad Nacional de las Artes <br>
Lic. en Artes Multimediales <br>
Informatica General 1- Drelichman TM <br>
2026 <br>
Dorgan (44448957), Hochnadel (31481155), La Rosa (95867452) <br></h2>

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

<p>En el desarrollo de la página principal, el index.html, lo primero que se hizo fue pensar a partir de la estructura que se le quería dar. Para que la página se vea de una manera clara e intuitiva, precisa y fácil de navegar para cualquier persona, se partió de un esqueleto con base técnica sencilla. Dentro del HEAD se ubicaron los metadatos, el título sencillo de JUEGOS, la vinculación a la api de google fonts y la vinculación a la hoja de estilos. Lo primero que vemos en el BODY del index.html es el HEADER dónde se puede ver del lado izquierdo un H1 como marca o nombre principal de la página para que sea reconocible fácil. En el centro del header ubicamos el NAV con las páginas de los juegos y puntajes horizontalmente, para que el usuario pueda elergir a que juego entrar siendo éste el tema escencial de la página, sumado a la página de puntajes de todos los juegos. Por último, del lado de la derecha se ubica la página información donde figuran los datos de las desarroladoras del sitio. Para que éste header se vea de ésta manera se colocó el h1 del header en un DIV, el nav de las páginas de los juegos,  puntajes y la página de información se dividio en dos DIV, un div con la página de los juegos y puntajes y el otro div con la página de información. Luego proseguimos con el MAIN del body, el cual se dividió en dos SECTION. En el primer section tenemos un H2 con un cartel de bienvenida y un P (párrafo) con la explicación de lo que se trata el sitio. En el segundo section vamos a encontrar un h2 preguntando a que quiere jugar el usuaruio, luego dentro de un div tres ARTICLES con un H3 y un párrafo cada uno donde encontramos el nombre de cada juego y una breve explicación. Por último, pero no menos importante, encontrams el FOOTER, el contenido de pie de página con información pertinente al tp, materia y Universidad y los apellidos de las desarrolladoras con un link a la página de información.html invitando al usuario a conocer el equipo.</p>  

<h3>Página de Dados:</h3>

<p>Para el juego de dados, antes de que se decida el modo de juego actual, se pasó por otro modo de juego diferente. En un principio era el jugador contra la máquina y quien se acercara mas a 21 sumando tiradas de los dos dados sin pasarse ganaba. El jugador tiraba los dos dados y la suma se acumulaba, según si estaba cerca de 21 o no, seguía sumando o se plantaba en un número, si se pasaba de 21 perdía y si se plantaba, seguía la máquina tb hasta llegar a 21. El que ganaba era el que más se acercaba a 21. Se desarrolló el html y el js, pero luego de una reunión grupal, se decidió que ese modo de juego no iba con la idea de tener una página de puntajes de usuarios reales. Entonces a partir de ahí, se pensó en otro modo de juego de dados individual.</p>

<p>A partir de cambiar el modo de juego de los dados, se decide crear un nuevo dados.html.</p>

<p> La página del juego de dados (<code>dados.html</code>) contiene la estructura del juego "Llegá a 33". Se escribió en HTML5, con el idioma declarado en español y la codificación <code>utf-8</code> para que se vean correctamente las tildes y la ñ. En el <code>&lt;head&gt;</code> se definió el título de la pestaña, se importaron las tipografías de Google Fonts y se enlazó la hoja de estilos única del sitio, que comparten todas las páginas. Como el archivo se encuentra dentro de la carpeta <code>juegos-html</code>, las rutas hacia otras carpetas comienzan con <code>../</code>. </p>

<p> Al igual que el resto de las páginas, incluye un <code>&lt;header&gt;</code> con el menú de navegación, que enlaza con el inicio, los tres juegos, la página de puntajes y la de información, y un <code>&lt;footer&gt;</code> con los créditos del proyecto. Entre ambos se encuentra el <code>&lt;main&gt;</code>, que contiene el título del juego y tres secciones (<code>&lt;section&gt;</code>), una por cada pantalla. Solo se muestra una por vez: el JavaScript las oculta o las muestra modificando el atributo <code>hidden</code>, siguiendo la misma lógica de pantallas que se utilizó en la página de preguntas. </p>

<p> La primera sección, <code>dadosInicio</code>, es la única visible al cargar la página. Reúne el récord actual, las instrucciones del juego en una lista ordenada (<code>&lt;ol&gt;</code>), un formulario con una etiqueta y un campo de texto para ingresar el nombre, un párrafo reservado para mostrar un mensaje de error si el nombre está vacío y el botón <strong>Continuar</strong>. La decisión de mostrar las instrucciones desde el principio, y no en una pantalla aparte, se tomó para mantener la misma lógica que el resto de los juegos del sitio. </p>

<p> La segunda sección, <code>dadosJuego</code>, comienza oculta y se muestra una vez que el jugador ingresa su nombre. Incluye el título con el nombre del jugador, un bloque de estadísticas con el objetivo, el total y la cantidad de tiradas, las dos imágenes de los dados (que comienzan con la imagen de "sin tirar"), los botones <strong>Tirar y Sumar</strong> y <strong>Tirar y Restar</strong> y un párrafo donde se informa lo que salió en cada tirada. El botón de restar comienza deshabilitado mediante el atributo <code>disabled</code> y solo se activa cuando el jugador se pasa de 33. </p>

<p> La tercera sección, <code>dadosFinal</code>, también comienza oculta y aparece cuando el jugador llega a 33. Contiene el resultado de la partida, un mensaje que informa si se obtuvo el récord y el botón <strong>Jugar de nuevo</strong>, que de esta manera solo está disponible una vez terminada la partida. </p>

<p> Casi todos los elementos dinámicos tienen un <code>id</code> único, que funciona como punto de conexión con el archivo <code>dados.js</code>: el JavaScript los busca con <code>querySelector</code> para leerlos o modificarlos. Para los estilos se reutilizaron clases ya definidas en la hoja general (<code>botonLargo</code>, <code>formularioJuego</code> y <code>stats</code>), evitando repetir código. Por último, el archivo carga <code>dados.js</code> al final del <code>&lt;body&gt;</code>, para que el código se ejecute cuando todos los elementos ya existen. </p>

 <h4>Lógica del juego (dados.js):</h4>

<p> El juego de dados es de un solo jugador y su objetivo es llegar a <strong>33 justo</strong>. En cada tirada se lanzan dos dados y su suma se agrega al total; si el jugador se pasa de 33, se habilita la opción de restar, y si al restar queda por debajo de 33, vuelve a sumar. La partida termina cuando el total es exactamente 33. El puntaje es la cantidad de tiradas (sumando y restando) que necesitó el jugador: cuantas menos tiradas, mejor puntaje. </p>

<p> El archivo <code>dados.js</code> comienza declarando los datos del juego. El valor a alcanzar se guarda en una constante (<code>OBJETIVO</code>), porque nunca cambia, mientras que el nombre del jugador, el total y la cantidad de tiradas se guardan en variables (<code>let</code>), ya que se modifican durante la partida. Luego se traen del HTML, con <code>document.querySelector</code>, todos los elementos con los que el programa necesita trabajar (botones, textos, imágenes y secciones), agrupados según la pantalla a la que pertenecen. </p>

<p> Para evitar repetir código, el funcionamiento se dividió en funciones pequeñas que hacen una sola tarea. La función <code>tirarDado</code> genera un número entero del 1 al 6 combinando <code>Math.random</code> y <code>Math.floor</code>. La función <code>mostrarDados</code> arma el nombre de la imagen correspondiente (por ejemplo, <code>dado-4.png</code>) y actualiza tanto el <code>src</code> como el texto alternativo de cada dado. La función <code>actualizarBotones</code> decide qué botón puede usarse: asigna a la propiedad <code>disabled</code> el resultado de comparar el total con el objetivo, de modo que solo se pueda sumar cuando el total está por debajo de 33 y solo se pueda restar cuando está por encima. </p>

<p> Como los botones de sumar y restar hacen casi lo mismo, ambos utilizan una única función, <code>tirar</code>, que recibe un parámetro llamado <code>signo</code>: vale <code>1</code> para sumar y <code>-1</code> para restar. La función tira los dos dados, muestra las imágenes, actualiza el total y la cantidad de tiradas, y arma un mensaje que informa lo que salió y lo que le falta al jugador (se utilizó un operador ternario para elegir entre "sumaste" y "restaste"). Si el total es exactamente 33, se llama a <code>terminarPartida</code> y se corta la función con <code>return</code>; en caso contrario se actualizan los botones. </p>

<p> El juego se controla mediante eventos (<code>addEventListener</code>). El botón <strong>Continuar</strong> limpia el nombre con <code>trim</code> y, si quedó vacío, muestra un mensaje de error y no avanza; si es válido, oculta la sección de inicio y muestra la del juego. Los botones de tirada llaman a <code>tirar(1)</code> y <code>tirar(-1)</code>, y el botón <strong>Jugar de nuevo</strong> reinicia las variables, deja los dados en su imagen de "sin tirar" y vuelve a la pantalla de inicio. La función <code>mostrarRecord</code> también se ejecuta apenas se carga la página, para que el récord se vea desde el principio. </p>

<p> El récord se guarda con <code>localStorage</code> bajo la clave <code>recordDados</code>, como un objeto con el nombre del jugador y la cantidad de tiradas, convertido a texto con <code>JSON.stringify</code> y recuperado con <code>JSON.parse</code>. Al ser un único récord general, se guarda solo uno. La función <code>guardarRecord</code> lo reemplaza cuando la partida terminó con menos tiradas o con la misma cantidad que el récord anterior; se decidió que el empate también lo reemplace para que siempre quede registrado el último jugador en lograr el mejor puntaje. Este mismo récord es el que lee la página de puntajes. </p>

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

<h4>Ana Clara Hochnadel</h4>
<p>Declaro el uso de la Inteligencia Artificial a través de la aplicación Claude IA. Esta aplicación es la que vengo usando a lo largo de la cursada. Al principio solamente la usaba para preguntas muy puntuales. Luego entendí que la interacción con la misma podía hacerse más enrriquecedora para mi aprendizaje. Para el desarrollo de la parte que me tocaba a mi dentro del TP grupal, utilicé la IA como apoyo y consulta para el desarrollo paso a paso del código tanto como para la parte del html como para la parte del js. Tambíen utilice la IA para la busqueda de algún error en el funcionamiento del las funciones y de errores de escritura que hacían que el código fallara. En cuanto a los comentarios dentro de los html y el js le pedí a la IA que me corrija varios comentarios hechos por mi para que se entienda mejor la redacción de los mismos. La IA me ayudó tb a resolver un problema que me surgio con la imagen de los dados, básicamente me presentó una alternativa facil y sencilla. Al principio para los dados quería usar gifs de dados en movimiento y que cuando dejaban de moverse mostraba un numero, pero no encontre páginas gatuitas para descargar esos gifs. Luego de preguntar como resolverlo a la IA me propuso utilizar imagenes estáticas, fotos de los dados de cada numero, una vez que se tiran los dados con una función declarada, me muetsra la imagen del dado con el numero que salio luego de la función. Por último, utilicé la IA para que me ayude a redactar de forma mas ordenada la documentación</p>
