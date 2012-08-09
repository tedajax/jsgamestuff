function PathNode(nx, ny, p, ng, nh)
{
	this.x = (nx != null) ? nx : 0;
	this.y = (ny != null) ? ny : 0;
	this.parent = (p != null) ? p : null;
	this.g = (ng != null) ? ng : 0;
	this.h = (nh != null) ? nh : 0;
	this.f = this.g + this.h;
};

function AStarPather()
{
	AStarPather.openlist = [];
	AStarPather.closedlist = [];

	AStarPather.Destination = new PathNode();

	AStarPather.MAX_DEPTH = 500;
};

AStarPather.ValidCell = function(x, y)
{
	return (x >= 0 && x < GameWorld.cellWidth && y >= 0 && y < GameWorld.cellHeight);
};

AStarPather.IsDiagnolFrom = function(x1, y1, x2, y2)
{
	return (Math.abs(y2 - y1) === Math.abs(x2 - x1));
};

AStarPather.HasDiagnolBlocker = function(x1, y1, x2, y2)
{
	if (!AStarPather.IsDiagnolFrom(x1, y1, x2, y2))
		return false;

	//check that the positions are adjacent
	if (!(Math.abs(y2 - y1) === 1 && Math.abs(x2 - x1) === 1))
		return false;

	return (GameWorld.nodes[x2][y1] || GameWorld.nodes[x1][y2]);
};

AStarPather.AddToOpen = function(node)
{
	for (var i = 0, len = AStarPather.openlist.length; i < len; i++)
		if (AStarPather.openlist[i].x === node.x && AStarPather.openlist[i].y === node.y)
			return;

	//this is better way
	for (var i = 0, len = AStarPather.closedlist.length; i < len; i++)
		if (AStarPather.closedlist[i].x === node.x && AStarPather.closedlist[i].y === node.y)
			return;

	AStarPather.openlist.push(node);
};

AStarPather.AddToClosed = function(node)
{
	for (var i = 0; i < AStarPather.closedlist.length; i++)
		if (AStarPather.closedlist[i].x === node.x && AStarPather.closedlist[i].y === node.y)
			return;

	AStarPather.openlist.remove(AStarPather.openlist.indexOf(node));
	AStarPather.closedlist.push(node);
};

AStarPather.IsNodeAdjacent = function(node, adj)
{
	return (Math.abs(adj.x - node.x) === 1 && Math.abs(adj.y - node.y) === 1);
}

AStarPather.GetAdjacentOpenNodes = function(node)
{
	var adjacent = [];

	for (var i = 0; i < AStarPather.openlist.length; i++)
	{
		var onode = AStarPather.openlist[i];
		if (AStarPather.IsNodeAdjacent(node, onode))
			adjacent.push(onode);
	}

	return adjacent;
};

AStarPather.ManDistance = function(fromx, fromy, tox, toy)
{
	if (!AStarPather.ValidCell(fromx, fromy) || !AStarPather.ValidCell(tox, toy))
		return 0;

	//return (Math.abs(fromy - toy) * 10 + Math.abs(fromx - tox) * 10);
	return (fromy - toy) * (fromy - toy) + (fromx - tox) * (fromx - tox);
};

AStarPather.MinFScore = function()
{
	var minscore = 99999999;
	var result = null;
	for (var i = 0; i < AStarPather.openlist.length; i++)
	{
		var node = AStarPather.openlist[i];

		if (node.f < minscore)
		{
			minscore = node.f;
			result = node;
		}
	}

	return result;
};

AStarPather.MinGScore = function()
{
	var minscore = 99999999;
	var result = null;
	for (var i = 0; i < AStarPather.openlist.length; i++)
	{
		var node = AStarPather.openlist[i];

		if (node.g < minscore)
		{
			minscore = node.g;
			result = node;
		}
	}

	return result;
};

AStarPather.GetPath = function(fromx, fromy, tox, toy)
{
	//validate grid coordinates
	if (!AStarPather.ValidCell(fromx, fromy) || !AStarPather.ValidCell(tox, toy))
		return null;

	if (GameWorld.nodes[tox][toy] === 1)
		return null;

	//return null if the points are at the same location
	if (fromx === tox && fromy === toy) 
		return null;

	AStarPather.openlist.length = 0;
	AStarPather.closedlist.length = 0;

	AStarPather.Destination.x = tox;
	AStarPather.Destination.y = toy;

	node = new PathNode(fromx, fromy, null, 0, 0);
	AStarPather.openlist.push(node);

	finalNode = AStarPather.ProcessNode(node);
	result = new Array();
	if (finalNode != null)
	{
		slider = finalNode;
		result.push(slider);
		while (slider.parent != null)
		{
			slider = slider.parent;
			result.push(slider);
		}
	}

	result.reverse();

	return result;
};

AStarPather.ProcessNode = function(node, depth)
{
	if (depth == null) depth = 0;

	if (depth >= AStarPather.MAX_DEPTH) return;

	if (GameWorld.nodes[node.x][node.y]) return null;

	if (node.x == AStarPather.Destination.x && node.y == AStarPather.Destination.y)
	{
		return node;
	}

	AStarPather.AddToClosed(node);

	//add available non allocated nodes to the openlist
	for (var i = node.x - 1; i <= node.x + 1; i++)
	{
		for (var j = node.y - 1; j <= node.y + 1; j++)
		{
			if (AStarPather.ValidCell(i, j) && GameWorld.nodes[i][j] == 0)
			{
				if (!AStarPather.HasDiagnolBlocker(node.x, node.y, i, j))
				{
					AStarPather.AddToOpen(new PathNode(i, j, node, 
													  ((i == node.x || j == node.y) ? 10 : 14) + node.g, 
													  AStarPather.ManDistance(i, j, 
													  						  AStarPather.Destination.x, 
													  						  AStarPather.Destination.y)));
				}
			}
		}
	}

	//compare G scores of adjacent open list squares
	adjOpenNodes = AStarPather.GetAdjacentOpenNodes(node);
	for (var i = 0; i < adjOpenNodes.length; i++)
	{
		var anode = adjOpenNodes[i];

		if (anode.g < node.g)
		{
			anode.parent = node;
			anode.g = node.g + ((anode.x == node.x || anode.y == node.y) ? 10 : 14);
			anode.f = anode.g + anode.h;
		}
	}

	if (AStarPather.openlist.length === 0) return null;

	return AStarPather.ProcessNode(AStarPather.MinFScore(), depth + 1);
};

AStarPather.DebugDraw = function()
{
	var count = 0;
	for (var i = 0; i < AStarPather.openlist.length; i++)
	{
		var node = AStarPather.openlist[i];

		context.fillStyle = "rgba(0, 200, 0, 0.5)";
		context.fillRect(node.x * GameWorld.nodeSize, node.y * GameWorld.nodeSize, 
						 GameWorld.nodeSize, GameWorld.nodeSize);

		if (GameWorld.nodeSize >= 40)
		{
			context.fillStyle = "rgba(0, 0, 0, 1)";
			context.font = "8pt Helvetica";
			var bx = node.x * GameWorld.nodeSize;
			var by = node.y * GameWorld.nodeSize;

			context.fillText(node.f, bx + 2, by + 12);
			context.fillText(node.g, bx + 2, by + 40);
			context.fillText(node.h, bx + ((node.h > 99) ? 22 : 25), by + 40);
		}
	}

	for (var i = 0; i < AStarPather.closedlist.length; i++)
	{
		var node = AStarPather.closedlist[i];

		context.fillStyle = "rgba(255, 255, 0, 1)";
		context.fillRect(node.x * GameWorld.nodeSize, node.y * GameWorld.nodeSize,
						 GameWorld.nodeSize, GameWorld.nodeSize);

		if (GameWorld.nodeSize >= 40)
		{
			context.fillStyle = "rgba(0, 0, 0, 1)";
			context.font = "8pt Helvetica";
			var bx = node.x * GameWorld.nodeSize;
			var by = node.y * GameWorld.nodeSize;

			context.fillText(node.f, bx + 2, by + 12);
			context.fillText(node.g, bx + 2, by + 40);
			context.fillText(node.h, bx + ((node.h > 99) ? 22 : 25), by + 40);
		}
	}

	context.fillStyle = "rgba(255, 0, 0, 1)";
	context.fillRect(AStarPather.Destination.x * GameWorld.nodeSize, AStarPather.Destination.y * GameWorld.nodeSize,
					 GameWorld.nodeSize, GameWorld.nodeSize);

	context.fillStyle = "rgba(0, 0, 0, 1)";
	context.font = "20pt Helvetica";
	context.fillText("Depth : " + AStarPather.MAX_DEPTH, 5, 30);
}

AStarPather();