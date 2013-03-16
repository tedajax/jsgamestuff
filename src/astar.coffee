class PathNode
	constructor: (nx, ny, p, ng, nh) ->
		@x = if nx? then nx else 0
		@y = if ny? then ny else 0
		@parent = if parent? then p else null
		@g = if ng? then ng else 0
		@h = if nh? then nh else 0
		@f = @g + @h

class @PathFinder
	constructor: (world, w, h) ->
		@openlist = []
		@closedlist = []
		@destination = new PathNode()

		@MAX_DEPTH = 500

		@CARDINAL_COST = 1
		@DIAGNOL_COST = Math.sqrt(2)
		@DIST_SCALE = 1
		@DIST_FUNC = PathFinder.distOctagonal

		@world = if world? and w? and h? then world else null
		@width = if w? then w else 0
		@height = if h? then h else 0

	setWorld: (world, w, h) ->
		@world = if world? and w? and h? then world else null
		@width = if w? then w else 0
		@height = if h? then h else 0		
		return

	validCell: (x, y) ->
		x >= 0 and x < @width and y >= 0 and y < @height

	isDiagnol: (x1, y1, x2, y2) ->
		Math.abs(y2 - y1) == Math.abs(x2 - x1)

	isAdjacent: (x1, y1, x2, y2) ->
		Math.abs(x1 - x2) == 1 and Math.abs(y1 - y2) == 1

	isNodeAjacent: (n1, n2) ->
		@isAdjacent(n1.x, n1.y, n2.x, n2.y)

	hasDiagnolBlocker: (x1, y1, x2, y2) ->
		if not @world? then return false

		if not @isAdjacent(x1, y1, x2, y2)
			return false

		@world[x2][y1] or @world[x1][y2]

	addToOpen: (node) ->
		for n in @openlist
			if n.x == node.x and n.y == node.y
				return;

		for n in @closedlist
			if n.x == node.x and n.y == node.y
				return;

		@openlist.push(node)

	addToClosed: (node) ->
		for n in @closedlist
			if n.x == node.x and n.y == node.y
				return;

		@openlist.remove(@openlist.indexOf(node))
		@closedlist.push(node)

	adjacentOpenNodes: (node) ->
		adjacent = []
		for n in @openlist
			if @isNodeAjacent(n, node)
				adjacent.push(n)

		return adjacent

	gCost: (x1, y1, x2, y2) ->
		if x1 == x2 or y1 == y2
			return @CARDINAL_COST
		else
			return @DIAGNOL_COST

	######################
	# Distance Functions #
	######################
	@distManhattan: (fromx, fromy, tox, toy, distScale) ->
		distScale = if distScale? then distScale else 1

		return (Math.abs(fromx - tox) * distScale + Math.abs(fromy - toy)) * distScale

	@distSq: (fromx, fromy, tox, toy, distScale) ->
		distScale = if distScale? then distScale else 1

		return (Math.pow(fromx - tox, 2) + Math.pow(fromy - toy, 2)) * distScale

	@dist: (fromx, fromy, tox, toy, distScale) ->
		distScale = if distScale? then distScale else 1
		return (Math.sqrt(Math.pow(fromx - tox, 2) + Math.pow(fromy - toy, 2))) * distScale

	@distFast: (fromx, fromy, tox, toy, distScale) ->
		distScale = if distScale? then distScale else 1
		dx = Math.abs(tox - fromx)
		dy = Math.abs(toy - fromy)
		min = Math.min(dx, dy)
		max = Math.max(dx, dy)

		approx = max * 1007 + min * 441
		if max < min << 4
			approx -= max * 40

		return ((approx + 512) >> 10) * distScale

	@distOctagonal: (fromx, fromy, tox, toy, distScale) ->
		distScale = if distScale? then distScale else 1

		dx = Math.abs(tox - fromx)
		dy = Math.abs(toy - fromy)

		return (0.941246 * Math.max(dx, dy) + 0.41 * Math.min(dx, dy)) * distScale

	minF: ->
		minscore = 9999999
		result = null
		for n in @openlist
			if n.f < minscore
				minscore = n.f
				result = n

		return result

	minG: ->
		minscore = 9999999
		result = null
		for n in @openlist
			if n.g < minscore
				minscore = n.g
				result = n

		return result

	getPath: (fromx, fromy, tox, toy, func) ->
		if func then @DIST_FUNC = func

		if not @world? 
			console.log 'no world defined'
			return null

		if not (@validCell(fromx, fromy) and @validCell(tox, toy)) 
			console.log 'start location or end location are not valid cells'
			return null

		if @world[tox][toy] or (fromx == tox and fromy == toy)
			console.log 'start and end location are the same'
			return null

		@openlist.length = 0
		@closedlist.length = 0

		@destination.x = tox
		@destination.y = toy

		node = new PathNode(fromx, fromy, null, 0, 0)
		@openlist.push(node)

		finalNode = @processNode(node)
		result = []
		if finalNode?
			slider = finalNode
			result.push(slider)
			while slider.parent?
				slider = slider.parent
				result.push(slider)

		result.reverse()

		return result

	processNode: (node, depth) ->
		if not node?
			return null

		if not depth?
			depth = 0

		if depth >= @MAX_DEPTH
			console.log 'max depth reached'
			return

		if @world[node.x][node.y]
			console.log 'node is blocked'
			return null

		if node.x == @destination.x and node.y == @destination.y
			console.log 'got to destination'
			return node

		@addToClosed(node)

		for i in [node.x - 1..node.x + 1]
			for j in [node.y - 1..node.y + 1]
				if @validCell(i, j)
					if @world[i][j] == 0 and not @hasDiagnolBlocker(node.x, node.y, i, j)
						gcost = @gCost(i, j, node.x, node.y) + node.g
						hcost = @DIST_FUNC(i, j, @destination.x, @destination.y, @DIST_SCALE)
						@addToOpen(new PathNode(i, j, node, gcost, hcost))

		adjOpenNode = @adjacentOpenNodes(node)
		for n in adjOpenNode
			if n.g < node.g
				n.parent = node
				n.g = node.g + @gCost(n.x, n.y, node.x, node.y)
				n.f = n.g + n.h

		return @processNode(@minF(), depth + 1)

	debugDraw: (nodeSize) ->
		nodeSize = if nodeSize? then nodeSize else 20

		context.fillStyle = "rgba(0, 200, 0, 0.5)"
		for n in @openlist
			context.fillRect(n.x * nodeSize, n.y * nodeSize, nodeSize, nodeSize)

		context.fillStyle = "rgba(255, 255, 0, 0.5)"
		for n in @closedlist
			context.fillRect(n.x * nodeSize, n.y * nodeSize, nodeSize, nodeSize)

		context.fillStyle = "rgba(255, 0, 0, 1)"
		context.fillRect(@destination.x * nodeSize, @destination.y * nodeSize, nodeSize, nodeSize)

		context.fillStyle = "rgba(0, 0, 0, 1)";
		context.font = "14pt Lucida Console";
		context.fillText("Max Depth         : " + @MAX_DEPTH, 5, 25);
		context.fillText("Cardinal Cost     : " + @CARDINAL_COST, 5, 50);
		context.fillText("Diagnol Cost      : " + @DIAGNOL_COST, 5, 75);
		context.fillText("Distance Function : " + @DIST_FUNC.name, 5, 100);