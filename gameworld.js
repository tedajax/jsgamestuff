function GameWorld()
{
	GameWorld.width = 2000;
	GameWorld.height = 2000;

	GameWorld.offset = new Vec2(GameWorld.width / 2, GameWorld.height / 2);

	GameWorld.nodeSize = 20;

	GameWorld.cellWidth = GameWorld.width / GameWorld.nodeSize;
	GameWorld.cellHeight = GameWorld.height / GameWorld.nodeSize;

	GameWorld.nodes = new Array();

	for (var i = 0; i < GameWorld.cellWidth; i++)
	{
		GameWorld.nodes[i] = new Array();
		for (var j = 0; j < GameWorld.cellHeight; j++)
		{
			GameWorld.nodes[i][j] = 0;
		}
	}

	for (var i = 0; i < 1000; i++)
	{
		var x = Math.randomrange(0, GameWorld.cellWidth - 1);
		var y = Math.randomrange(0, GameWorld.cellHeight - 1);
		GameWorld.nodes[x][y] = 1;
	}

	for (var i = Math.floor(GameWorld.cellHeight / 2) - 5; i < Math.floor(GameWorld.cellHeight / 2) + 5; i++)
		GameWorld.nodes[Math.floor(GameWorld.cellWidth / 2)][i] = 1;
};

GameWorld.Draw = function()
{
	for (var i = 0; i < GameWorld.cellWidth; i++)
		for (var j = 0; j < GameWorld.cellHeight; j++)
			if (GameWorld.nodes[i][j])
			{
				Game.context.fillStyle = "rgba(100, 100, 255, 0.5)"
				Game.context.fillRect(i * GameWorld.nodeSize - GameWorld.offset.x, j * GameWorld.nodeSize - GameWorld.offset.y, GameWorld.nodeSize, GameWorld.nodeSize);
			}

	for (var i = 0; i < GameWorld.cellWidth; i++)
	{
		Game.context.beginPath();
		Game.context.moveTo(i * GameWorld.nodeSize - GameWorld.offset.x, -GameWorld.offset.y);
		Game.context.lineTo(i * GameWorld.nodeSize - GameWorld.offset.x, GameWorld.offset.y);
		Game.context.stroke();
	}
	for (var i = 0; i < GameWorld.cellHeight; i++)
	{
		Game.context.beginPath();
		Game.context.moveTo(-GameWorld.offset.x, i * GameWorld.nodeSize - GameWorld.offset.y);
		Game.context.lineTo(GameWorld.offset.x, i * GameWorld.nodeSize - GameWorld.offset.y);
		Game.context.stroke();
	}

	Game.context.beginPath();
	Game.context.rect(-GameWorld.offset.x, -GameWorld.offset.y, GameWorld.width, GameWorld.height);
	Game.context.strokeStyle = "rgba(0, 0, 0, 1)";
	Game.context.stroke();


};

GameWorld.WorldToGrid = function(vec)
{
	var bx = Math.floor((vec.x + GameWorld.offset.x) / GameWorld.nodeSize);
	var by = Math.floor((vec.y + GameWorld.offset.y) / GameWorld.nodeSize);

	if (bx < 0) bx = 0;
	if (bx >= GameWorld.cellWidth) bx = GameWorld.cellWidth - 1;

	if (by < 0) by = 0;
	if (by >= GameWorld.cellheight - 1)
	{
		by = GameWorld.cellHeight - 2;
		console.log("poop");
	}

	return new Vec2(bx, by);
};

GameWorld.GridToWorld = function(vec)
{
	var wx = vec.x * GameWorld.nodeSize + GameWorld.nodeSize / 2 - GameWorld.offset.x;
	var wy = vec.y * GameWorld.nodeSize + GameWorld.nodeSize / 2 - GameWorld.offset.y;

	return new Vec2(wx, wy);
};

//GameWorld();