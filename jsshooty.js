const FPS = 60;

var canvas = null;
var context = null;

window.onload = Initialize;

var player = null;
var obstacle = null;
var panel = null;
var newobst = null;

var pathfound = null;

var fromx, fromy, tox, toy;

var selectBox;

var actors = [];

function Initialize()
{    
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    
    player = new Player();
    player.Initialize();

    selectBox = new SelectionBox();

    GameWorld();

    fromx = 7;
    fromy = 7;
    tox = Math.floor(GameWorld.cellWidth / 2) + 5;
    toy = Math.floor(GameWorld.cellHeight / 2);

    pathfound = AStarPather.GetPath(fromx, fromy, tox, toy);

    for (var i = 0; i < 10; i++)
    {
        actors.push(new Actor());
        actors[i].position = new Vec2(100, 100 + i * 50);
    }

    setInterval(Tick, 1000 / FPS);
};

function Tick()
{
    Update();
    Draw();
};

function Update()
{
    Time.Update();
    
    player.Update();
        
    ProjectileManager.Update();

    if (Input.GetKey(Keys.A))
    {
        AStarPather.MAX_DEPTH++;
        pathfound = AStarPather.GetPath(fromx, fromy, tox, toy);
    }
    if (Input.GetKey(Keys.S))
    {
        AStarPather.MAX_DEPTH--;
        pathfound = AStarPather.GetPath(fromx, fromy, tox, toy);
    }

    for (var i = 0, len = actors.length; i < len; i++)
        actors[i].Update();

    selectBox.Update();
    
    Input.Update();
};

function Draw()
{  
    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    GameWorld.Draw();
    // AStarPather.DebugDraw();

    // if (actor.path.length > 0)
    // {
    //     for (var i = 0; i < actor.path.length; i++)
    //     {
    //         var x = actor.path[i].x;
    //         var y = actor.path[i].y;

    //         context.beginPath();
    //         context.arc(x * GameWorld.nodeSize + GameWorld.nodeSize / 2, y * GameWorld.nodeSize + GameWorld.nodeSize / 2, GameWorld.nodeSize / 3 - 2, 0, 2 * Math.PI, false);
    //         context.fillStyle = "rgba(0, 0, 255, 1)";
    //         context.fill();
    //     }
    // }

    //player.Draw();

    for (var i = 0, len = actors.length; i < len; i++)
        actors[i].Draw();

    ProjectileManager.Draw();

    selectBox.Draw();
};
