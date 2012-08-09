function GameWorld()
{
	GameWorld.width = canvas.width;
	GameWorld.height = canvas.height;

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

	for (var i = 0; i < 100; i++)
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
			if (GameWorld.nodes[i][j] === 1)
			{
				context.fillStyle = "rgba(100, 100, 255, 0.5)"
				context.fillRect(i * GameWorld.nodeSize, j * GameWorld.nodeSize, GameWorld.nodeSize, GameWorld.nodeSize);
			}
};

GameWorld.WorldToGrid = function(vec)
{
	var bx = Math.floor(vec.x / GameWorld.nodeSize);
	var by = Math.floor(vec.y / GameWorld.nodeSize);

	if (bx < 0) bx = 0;
	if (bx >= GameWorld.cellWidth) bx = GameWorld.cellWidth - 1;

	if (by < 0) by = 0;
	if (by >= GameWorld.cellheight) by = GameWorld.cellHeight - 1;

	return new Vec2(bx, by);
};

GameWorld.GridToWorld = function(vec)
{
	var wx = vec.x * GameWorld.nodeSize + GameWorld.nodeSize / 2;
	var wy = vec.y * GameWorld.nodeSize + GameWorld.nodeSize / 2;

	return new Vec2(wx, wy);
};

//GameWorld();