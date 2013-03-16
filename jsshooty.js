const FPS = 60;

window.onload = Initialize;

var player = null;
var obstacle = null;
var panel = null;
var newobst = null;

var pathfound = null;

var fromx, fromy, tox, toy;

var selectBox;

var actors = [];

// var distFuncs = [PathFinder.ManDistance, PathFinder.DistanceSquared, PathFinder.Distance, PathFinder.ApproxFastDistance, PathFinder.OctaganolDistance];
var distFuncIndex = 0;

var pathFinder;

function Initialize()
{    
    Game.Init();

    player = new Player();
    player.Initialize();

    selectBox = new SelectionBox();

    GameWorld();

    fromx = 7;
    fromy = 7;
    tox = Math.floor(GameWorld.cellWidth / 2) + 5;
    toy = Math.floor(GameWorld.cellHeight / 2);

    pathFinder = new PathFinder(GameWorld.nodes, GameWorld.width, GameWorld.height);

    for (var i = -20; i < 20; i++)
    {
        actors.push(new Actor());
        //var margin = GameWorld.nodeSize / 2;
        //var x = Math.randomrange(-GameWorld.offset.x + margin, 2 * GameWorld.offset.x - margin);
        //var y = Math.randomrange(-GameWorld.offset.y + margin, 2 * GameWorld.offset.y - margin);
        var x = i * GameWorld.nodeSize * 2;
        var y = 0;
        actors[i + 20].transform.position = new Vec2(x, y);
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

    selectBox.Update();

    var cameraSpeed = 500;
    if (Input.GetKey(Keys.D))
        Game.camera.Move(Vec2.Mul(Vec2.UNIT_X, cameraSpeed * Time.Delta()));
    if (Input.GetKey(Keys.A))
        Game.camera.Move(Vec2.Mul(Vec2.UNIT_X, -cameraSpeed * Time.Delta()));
    if (Input.GetKey(Keys.S))
        Game.camera.Move(Vec2.Mul(Vec2.UNIT_Y, cameraSpeed * Time.Delta()));
    if (Input.GetKey(Keys.W))
        Game.camera.Move(Vec2.Mul(Vec2.UNIT_Y, -cameraSpeed * Time.Delta()));

    Game.camera.Update();

    Input.Update();
};

function Draw()
{  
    Game.context.fillStyle = "rgba(255, 255, 255, 1)";
    Game.context.fillRect(0, 0, canvas.width, canvas.height);

    Game.context.save();

    Game.camera.ApplyTransform();
    GameWorld.Draw();

    // for (var i = 0, len = actors.length; i < len; i++)
    //     if (actors[i].selected)
    //         actors[i].DrawOccupiedNodes();

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

    Game.context.restore();
};
