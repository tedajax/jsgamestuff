function Keys()
{
    Keys.ZERO = 48;
    Keys.ONE = 49;
    Keys.TWO = 50;
    Keys.THREE = 51;
    Keys.FOUR = 52;
    Keys.FIVE = 53;
    Keys.SIX = 54;
    Keys.SEVEN = 55;
    Keys.EIGHT = 56;
    Keys.NINE = 57;

    Keys.A = 65;
    Keys.B = 66;
    Keys.C = 67;
    Keys.D = 68;
    Keys.E = 69;
    Keys.F = 70;
    Keys.G = 71;
    Keys.H = 72;
    Keys.I = 73;
    Keys.J = 74;
    Keys.K = 75;
    Keys.L = 76;
    Keys.M = 77;
    Keys.N = 78;
    Keys.O = 79;
    Keys.P = 80;
    Keys.Q = 81;
    Keys.R = 82;
    Keys.S = 83;
    Keys.T = 84;
    Keys.U = 85;
    Keys.V = 86;
    Keys.W = 87;
    Keys.X = 88;
    Keys.Y = 89;
    Keys.Z = 90;

    Keys.LEFT = 37;
    Keys.RIGHT = 39;
    Keys.UP = 38;
    Keys.DOWN = 40;
};

function MouseButton()
{
    MouseButton.NONE = -1;
    MouseButton.LEFT = 0;
    MouseButton.MIDDLE = 1;
    MouseButton.RIGHT = 2;
};

function MouseState()
{
    this.x = 0;
    this.y = 0;
    this.buttons = [false, false, false];
};

MouseState.prototype.clone = function(clone)
{
    this.x = clone.x;
    this.y = clone.y;
    this.buttons = clone.buttons.slice();
};

function Input()
{
    MouseButton();

    Input.newKeys = new Array();
    Input.oldKeys = new Array();
        
    for (var i = 0; i < 256; i++)
    {
        Input.newKeys[i] = false;
        Input.oldKeys[i] = false;
    }

    Input.newMouse = new MouseState();
    Input.oldMouse = new MouseState();
};

Input.OnKeyDown = function(event)
{
    Input.newKeys[event.keyCode] = true;  
};

Input.OnKeyUp = function(event)
{
    Input.newKeys[event.keyCode] = false;
};

Input.OnMouseDown = function(event)
{
    // var x = event.clientX - Game.canvas.offsetLeft;
    // var y = event.clientY - Game.canvas.offsetTop;

    // console.log(x + " " + y);

    // var bx = Math.floor(x / GameWorld.nodeSize);
    // var by = Math.floor(y / GameWorld.nodeSize);

    // if (GameWorld.nodes[bx][by])
    //     GameWorld.nodes[bx][by] = 0;
    // else
    //     GameWorld.nodes[bx][by] = 1;

    Input.newMouse.buttons[event.button] = true;

    return false;
};

Input.OnMouseUp = function(event)
{
    Input.newMouse.buttons[event.button] = false;

    return false;
};

Input.OnMouseMove = function(event)
{
    var x = event.clientX - Game.canvas.offsetLeft;
    var y = event.clientY - Game.canvas.offsetTop;

    Input.newMouse.x = x;
    Input.newMouse.y = y;
};

Input.Update = function()
{
    Input.oldKeys = Input.newKeys.slice();
    Input.oldMouse.clone(Input.newMouse);
};

Input.GetKey = function(keycode)
{
    return (Input.newKeys[keycode]);
};

Input.GetKeyUp = function(keycode)
{
    return (!Input.newKeys[keycode] && Input.oldKeys[keycode]);
};

Input.GetKeyDown = function(keycode)
{
    return (Input.newKeys[keycode] && !Input.oldKeys[keycode]);
};

Input.GetMouseButton = function(button)
{
    return (Input.newMouse.buttons[button]);
};

Input.GetMouseButtonDown = function(button)
{
    return (Input.newMouse.buttons[button] && !Input.oldMouse.buttons[button]);
};

Input.GetMouseButtonUp = function(button)
{
    return (!Input.newMouse.buttons[button] && Input.oldMouse.buttons[button]);
};

Input.GetMouseX = function()
{
    return Input.newMouse.x;
};

Input.GetMouseY = function()
{
    return Input.newMouse.y;
};

Input.GetWorldMouseX = function()
{
    return Input.newMouse.x - Game.camera.transform.position.x;
};

Input.GetWorldMouseY = function()
{
    return Input.newMouse.y - Game.camera.transform.position.y;
};

Keys();
Input();

document.onkeydown = Input.OnKeyDown;
document.onkeyup = Input.OnKeyUp;
document.onmousedown = Input.OnMouseDown;
document.onmouseup = Input.OnMouseUp;
document.onmousemove = Input.OnMouseMove;
