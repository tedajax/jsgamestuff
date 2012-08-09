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

	this.behavior = ActorBehavior.IDLE;

	this.path = [];

	this.currentTarget = new Vec2(0, 0); //the current location to move towards (parts of the path)

	this.targetThresholdRadius = 2; //must get within 2 pixels of target location to start going towards next one

	this.target = new Vec2(0, 0); //overall target that we generate a path to
	this.gridTarget = new Vec2(0, 0); //the target in grid coordinates

	this.position = Vec2.ZERO;
	this.gridPosition = new Vec2(0, 0); //the position in grid coordinates

	this.selected = false;

	this.bounds = new Rectangle(this.position.x - GameWorld.nodeSize / 2, 
								this.position.y - GameWorld.nodeSize / 2,
								GameWorld.nodeSize, 
								GameWorld.nodeSize);
};

Actor.prototype.Update = function()
{
	this.gridPosition = GameWorld.WorldToGrid(this.position);

	if (this.selected && Input.GetMouseButtonDown(MouseButton.RIGHT))
		this.SetTarget(new Vec2(Input.GetMouseX(), Input.GetMouseY()));

	switch (this.behavior)
	{
		case ActorBehavior.IDLE:
			break;

		case ActorBehavior.WALK:

			this.MoveToTarget();

			break;
	}

	this.bounds.x = this.position.x - GameWorld.nodeSize / 2;
	this.bounds.y = this.position.y - GameWorld.nodeSize / 2;

	///////////   TEMPORARY CODE   ///////////////
	for (var i = 0, len = actors.length; i < len; i++)
	{
		actor = actors[i];

		if (actor != this)
		{
			if (actor.bounds.ContainsRect(this.bounds))
			{
				var dir = Vec2.Sub(actor.position, this.position).Normalized();
				actor.position.Add(Vec2.Mul(dir, 1));

				actor.bounds.x = this.position.x - GameWorld.nodeSize / 2;
				actor.bounds.y = this.position.y - GameWorld.nodeSize / 2;
			}
		}
	}
	//////////   END TEMPORARY CODE   ////////////
};

Actor.prototype.MoveToTarget = function()
{
	this.direction = Vec2.Sub(this.currentTarget, this.position).Normalized()
	this.position.Add(this.direction.Mul(200).Mul(Time.Delta()));

	if (Vec2.Distance(this.position, this.currentTarget) <= this.targetThresholdRadius)
	{
		this.path.remove(0, 0);
		if (this.path.length > 0)
			this.currentTarget = GameWorld.GridToWorld(new Vec2(this.path[0].x, this.path[0].y));
		else
			this.behavior = ActorBehavior.IDLE;
	}
};

Actor.prototype.Draw = function()
{
	context.fillStyle = "rgba(255, 0, 0, 1)";	
	context.beginPath();
    context.arc(this.position.x, this.position.y, GameWorld.nodeSize / 2, 0, 2 * Math.PI, false);
    context.fill();

    if (this.selected)
    {
	    context.beginPath();
	    context.rect(this.bounds.Left(), this.bounds.Top(), this.bounds.Right() - this.bounds.Left(), this.bounds.Bottom() - this.bounds.Top());
	    context.lineWidth = 1;
	    context.strokeStyle = "rgba(0, 255, 0, 1)";
	    context.stroke();
	}
};

Actor.prototype.SetTarget = function(target)
{
	this.target.Clone(target);
	this.gridTarget = GameWorld.WorldToGrid(this.target);
	this.gridPosition = GameWorld.WorldToGrid(this.position);

	this.path = AStarPather.GetPath(this.gridPosition.x, this.gridPosition.y, this.gridTarget.x, this.gridTarget.y);

	if (this.path && this.path.length > 0)
	{
		this.behavior = ActorBehavior.WALK;
		this.currentTarget = GameWorld.GridToWorld(new Vec2(this.path[0].x, this.path[0].y));
	}
};