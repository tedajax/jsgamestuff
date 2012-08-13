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

var camera;

var distFuncs = [AStarPather.ManDistance, AStarPather.DistanceSquared, AStarPather.Distance, AStarPather.ApproxFastDistance];
var distFuncIndex = 0;

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

    for (var i = 0; i < 100; i++)
    {
        actors.push(new Actor());
        var x = Math.randomrange(GameWorld.nodeSize / 2, canvas.width - GameWorld.nodeSize / 2);
        var y = Math.randomrange(GameWorld.nodeSize / 2, canvas.height - GameWorld.nodeSize / 2);
        actors[i].transform.position = new Vec2(x, y);
    }

    camera = new Camera();

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

    // if (Input.GetKey(Keys.A))
    // {
    //     AStarPather.MAX_DEPTH++;
    //     pathfound = AStarPather.GetPath(fromx, fromy, tox, toy);
    // }
    // if (Input.GetKey(Keys.S))
    // {
    //     AStarPather.MAX_DEPTH--;
    //     pathfound = AStarPather.GetPath(fromx, fromy, tox, toy);
    // }

    // if (Input.GetKeyDown(Keys.ONE))
    // {
    //     AStarPather.CARDINAL_COST--;
    //     pathfound = AStarPather.GetPath(fromx, fromy, tox, toy);
    // }
    // if (Input.GetKeyDown(Keys.TWO))
    // {
    //     AStarPather.CARDINAL_COST++;
    //     pathfound = AStarPather.GetPath(fromx, fromy, tox, toy);
    // }

    // if (Input.GetKeyDown(Keys.THREE))
    // {
    //     AStarPather.DIAGNOL_COST--;
    //     pathfound = AStarPather.GetPath(fromx, fromy, tox, toy);
    // }
    // if (Input.GetKeyDown(Keys.FOUR))
    // {
    //     AStarPather.DIAGNOL_COST++;
    //     pathfound = AStarPather.GetPath(fromx, fromy, tox, toy);
    // }

    // if (Input.GetKeyDown(Keys.FIVE))
    // {
    //     distFuncIndex++;
    //     if (distFuncIndex >= distFuncs.length) distFuncIndex = 0;
    //     pathfound = AStarPather.GetPath(fromx, fromy, tox, toy, distFuncs[distFuncIndex]);
    // }
    
    // // if (Input.GetKeyDown(Keys.FIVE))
    // // {
    // //     AStarPather.CARDINAL_COST--;
    // //     pathfound = AStarPather.GetPath(fromx, fromy, tox, toy);
    // // }
    // // if (Input.GetKeyDown(Keys.ONE))
    // // {
    // //     AStarPather.CARDINAL_COST--;
    // //     pathfound = AStarPather.GetPath(fromx, fromy, tox, toy);
    // // }

    // fromx = GameWorld.WorldToGrid(new Vec2(Input.GetMouseX(), Input.GetMouseY())).x;
    // fromy = GameWorld.WorldToGrid(new Vec2(Input.GetMouseX(), Input.GetMouseY())).y;
    // pathfound = AStarPather.GetPath(fromx, fromy, tox, toy);

    for (var i = 0, len = actors.length; i < len; i++)
        actors[i].Update();

    camera.transform.position.x += 1;

    selectBox.Update();
    
    Input.Update();
};

function Draw()
{  
    context.save();

    camera.ApplyTransform();

    context.fillStyle = "rgba(255, 255, 255, 1)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    GameWorld.Draw();
    // AStarPather.DebugDraw();

    // if (pathfound != null && pathfound.length > 0)
    // {
    //     for (var i = 0; i < pathfound.length; i++)
    //     {
    //         var x = pathfound[i].x;
    //         var y = pathfound[i].y;

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
