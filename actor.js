Util.CreateInheritance(Actor, GameObject);

function ActorBehavior()
{
	ActorBehavior.IDLE = 0;
	ActorBehavior.WALK = 1;
};

ActorBehavior();

function Actor()
{
	this.GameObject();	

	this.transform.SetParent(root);

	this.behavior = ActorBehavior.IDLE;

	this.path = [];

	this.currentTarget = new Vec2(0, 0); //the current location to move towards (parts of the path)

	this.targetThresholdRadius = 2; //must get within 2 pixels of target location to start going towards next one

	this.target = new Vec2(0, 0); //overall target that we generate a path to
	this.gridTarget = new Vec2(0, 0); //the target in grid coordinates

	this.targetRotation = 0;

	this.transform.position = Vec2.ZERO;
	this.gridPosition = new Vec2(0, 0); //the position in grid coordinates

	this.selected = false;

	this.bounds = new Rectangle(this.transform.position.x - GameWorld.nodeSize / 2, 
								this.transform.position.y - GameWorld.nodeSize / 2,
								GameWorld.nodeSize, 
								GameWorld.nodeSize);

	this.speed = 100;
};

Actor.prototype.Update = function()
{
	this.gridPosition = GameWorld.WorldToGrid(this.transform.position);

	if (this.selected && Input.GetMouseButtonDown(MouseButton.RIGHT))
		this.SetTarget(new Vec2(Input.GetWorldMouseX(), Input.GetWorldMouseY()));

	switch (this.behavior)
	{
		case ActorBehavior.IDLE:
			break;

		case ActorBehavior.WALK:

			this.MoveToTarget();

			break;
	}

	this.bounds.x = this.transform.position.x - GameWorld.nodeSize / 2;
	this.bounds.y = this.transform.position.y - GameWorld.nodeSize / 2;

	///////////   TEMPORARY CODE   ///////////////
	for (var i = 0, len = actors.length; i < len; i++)
	{
		actor = actors[i];

		if (actor != this)
		{
			if (actor.bounds.ContainsRect(this.bounds))
			{
				var dir = Vec2.Sub(actor.transform.position, this.transform.position).Normalized();
				actor.transform.position.Add(Vec2.Mul(dir, 1));

				actor.bounds.x = this.transform.position.x - GameWorld.nodeSize / 2;
				actor.bounds.y = this.transform.position.y - GameWorld.nodeSize / 2;
			}
		}
	}
	//////////   END TEMPORARY CODE   ////////////

	this.transform.BuildMatrix();
};

Actor.prototype.MoveToTarget = function()
{
	// this.direction = Vec2.Sub(this.currentTarget, this.transform.position).Normalized()
	// this.transform.position.Add(this.direction.Mul(200).Mul(Time.Delta()));

	// if (Vec2.Distance(this.transform.position, this.currentTarget) <= this.targetThresholdRadius)
	// {
	// 	this.path.remove(0, 0);
	// 	if (this.path.length > 0)
	// 		this.currentTarget = GameWorld.GridToWorld(new Vec2(this.path[0].x, this.path[0].y));
	// 	else
	// 		this.behavior = ActorBehavior.IDLE;
	// }


	this.transform.rotation = Util.WrapAngle(this.transform.rotation);

	rotspeed = 50;

	if (Util.WrapAngle(Math.abs(this.transform.rotation - this.targetRotation)) > Math.PI)
	{
		if (this.targetRotation < this.transform.rotation)
			this.transform.rotation += rotspeed * Time.Delta();
		if (this.targetRotation > this.transform.rotation)
			this.transform.rotation -= rotspeed * Time.Delta();	
	}
	else
	{
		if (this.targetRotation > this.transform.rotation)
			this.transform.rotation += rotspeed * Time.Delta();
		if (this.targetRotation < this.transform.rotation)
			this.transform.rotation -= rotspeed * Time.Delta();
	}
	

	this.direction = Vec2.GetDirectionFromRotation(this.transform.rotation);
	this.transform.position.Add(this.direction.Mul(this.speed).Mul(Time.Delta()));

	this.targetRotation = Math.atan2(this.currentTarget.y - this.transform.position.y,
								 	 this.currentTarget.x - this.transform.position.x) + Math.PI * 2;

	if (Vec2.Distance(this.transform.position, this.currentTarget) <= this.targetThresholdRadius)
	{
		this.path.remove(0, 0);
		if (this.path.length > 0)
		{
			this.currentTarget = GameWorld.GridToWorld(new Vec2(this.path[0].x, this.path[0].y));
		}
		else
			this.behavior = ActorBehavior.IDLE;
	}	
};

Actor.prototype.Draw = function()
{
	Game.context.save();
	this.transform.TransformContext(Game.context);

	Game.context.beginPath();
    Game.context.arc(0, 0, GameWorld.nodeSize / 2, 0, 2 * Math.PI, false);
    Game.context.fillStyle = "rgba(255, 0, 0, 1)";	
    Game.context.fill();

    Game.context.restore();

    if (this.selected)
    {
	    Game.context.beginPath();
	    Game.context.rect(this.bounds.Left(), this.bounds.Top(), this.bounds.Right() - this.bounds.Left(), this.bounds.Bottom() - this.bounds.Top());
	    Game.context.lineWidth = 1;
	    Game.context.strokeStyle = "rgba(0, 255, 0, 1)";
	    Game.context.stroke();
	}

	Game.context.strokeStyle = "rgba(0, 255, 255, 1)";
	if (this.path != null)
	{
		for (var i = 0, len = this.path.length; i < len; i++)
		{
			node = this.path[i];
			pos = GameWorld.GridToWorld(node);
			Game.context.beginPath();
		    Game.context.arc(pos.x, pos.y, GameWorld.nodeSize / 6, 0, 2 * Math.PI, false);
		    Game.context.fillStyle = "rgba(0, 0, 255, 1)";	
		    Game.context.fill();

		    if (i < len - 1)
		    {
		    	Game.context.beginPath();
		    	Game.context.moveTo(pos.x, pos.y);
		    	next = GameWorld.GridToWorld(this.path[i+1])
		    	Game.context.lineTo(next.x, next.y);
		    	Game.context.stroke();
		    }
		}
	}
};

Actor.prototype.SetTarget = function(target)
{
	var gtarget = GameWorld.WorldToGrid(target);

	var newpath = pathFinder.getPath(this.gridPosition.x, this.gridPosition.y, gtarget.x, gtarget.y);

	if (newpath != null && newpath.length > 0)
	{
		this.path = newpath;

		this.target.Clone(target);
		this.gridTarget = GameWorld.WorldToGrid(this.target);

		this.behavior = ActorBehavior.WALK;
		this.currentTarget = GameWorld.GridToWorld(new Vec2(this.path[0].x, this.path[0].y));

		this.targetRotation = Math.atan2(this.currentTarget.y - this.transform.position.y,
										 this.currentTarget.x - this.transform.position.x);
	}
};

Actor.prototype.DrawOccupiedNodes = function()
{
	nodes = this.GetOccupiedNodes();

	Game.context.fillStyle = "rgb(0, 0, 255)";
	for (var i = 0, len = nodes.length; i < len; i++)
	{
		pos = GameWorld.GridToWorld(nodes[i]);
		
		Game.context.fillRect(pos.x - GameWorld.nodeSize / 2, pos.y - GameWorld.nodeSize / 2, GameWorld.nodeSize, GameWorld.nodeSize);
		
	}
};

Actor.prototype.GetOccupiedNodes = function()
{
	result = [];

	tl = GameWorld.WorldToGrid(Vec2.Add(this.bounds.TopLeft(), Vec2.ONE));
	tr = GameWorld.WorldToGrid(Vec2.Add(this.bounds.TopRight(), new Vec2(-1, 1)));
	bl = GameWorld.WorldToGrid(Vec2.Add(this.bounds.BotLeft(), new Vec2(1, -1)));
	br = GameWorld.WorldToGrid(Vec2.Sub(this.bounds.BotRight(), Vec2.ONE));

	result.push(tl);
	if (!result.contains(tr)) result.push(tr);
	if (!result.contains(bl)) result.push(bl);
	if (!result.contains(br)) result.push(br);

	return result;	
};
