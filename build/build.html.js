
const designer = document.getElementById('designer');
window.addEventListener('contextmenu', e => {
    e.preventDefault();
    const nodeMenu = document.getElementsByClassName('node-menu')[0];
    const { x, y } = getMousePosition();
    nodeMenu.style.top = `${y}px`;
    nodeMenu.style.left = `${x}px`;
    const att = e.target.getAttribute('class');
    for(const nodeAction of Array.from(document.getElementsByClassName('node-action'))) {
        console.log('removing ',nodeAction);
        nodeMenu.removeChild(nodeAction);
    };
    if (att === 'canvas-node') {
        createNodeAction({ name: 'Set Node Name', callback: ({ event }) => {
            for(const canvasNode of Array.from(document.getElementsByClassName('canvas-node'))) {
                const canvasNodeInput = canvasNode.children[0];
                canvasNodeInput.focus();
                console.log(canvasNodeInput);
            };
        }});
    } else {
       
        createNodeAction({ name: 'Add State Node', callback: createCanvasNode });
        createNodeAction({ name: 'Add Action Node', callback: createCanvasNode });
    }
    nodeMenu.style.visibility = 'visible';
});



function createCanvasNode({ event }) {
    const canvasNodeCount = document.getElementsByClassName('canvas-node').length;

    const canvasNode = document.createElement('canvas');
    canvasNode.setAttribute('class','canvas-node');
    canvasNode.setAttribute('id', uuidv4());

    const canvasNodeTextBox = document.createElement('input');
    canvasNodeTextBox.setAttribute('class','canvas-node-input');
    canvasNodeTextBox.setAttribute('type','text');
    canvasNodeTextBox.setAttribute('value','New Node');
    canvasNode.appendChild(canvasNodeTextBox);
    
    const { x, y } = getMousePosition();
    canvasNode.style.top = `${y}px`;
    canvasNode.style.left = `${x}px`;

    designer.appendChild(canvasNode);

    var ctx = canvasNode.getContext("2d");
    ctx.beginPath();
    ctx.rect(0, 0, canvasNode.width, canvasNode.height);
    ctx.stroke();
}

function createNodeAction({ name, callback }) {
    const nodeMenu = document.getElementsByClassName('node-menu')[0];
    const nodeAction = document.createElement('div');
    nodeAction.setAttribute('class','node-action');
    nodeAction.setAttribute('name', name);
    nodeAction.innerHTML = name;
    nodeAction.addEventListener('click', (event) => {
        nodeMenu.style.visibility = 'hidden'
        callback({ name, event });
    });
    nodeMenu.appendChild(nodeAction);
}

function getMousePosition() {
    const e = window.event;
    const posX = e.clientX;
    const posY = e.clientY;
    return { x: posX, y: posY };
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
  