function Rectangle(x, y, w, h)
{
	this.x = (x) ? x : 0;
	this.y = (y) ? y : 0;
	this.width = (w) ? w : 0;
	this.height = (h) ? h : 0;
};

Rectangle.prototype.Top = function()
{
	return ((this.height >= 0) ? this.y : this.y + this.height);
};

Rectangle.prototype.Bottom = function()
{
	return ((this.height < 0) ? this.y : this.y + this.height);
};

Rectangle.prototype.Left = function()
{
	return ((this.width >= 0) ? this.x : this.x + this.width);
};

Rectangle.prototype.Right = function()
{
	return ((this.width < 0) ? this.x : this.x + this.width);
};

Rectangle.prototype.TopLeft = function()
{
	return new Vec2(this.Left(), this.Top());
};

Rectangle.prototype.TopRight = function()
{
	return new Vec2(this.Right(), this.Top());
};

Rectangle.prototype.BotLeft = function()
{
	return new Vec2(this.Left(), this.Bottom());
};

Rectangle.prototype.BotRight = function()
{
	return new Vec2(this.Right(), this.Bottom());
};

Rectangle.prototype.DistToRect = function(rect)
{
	L = 0, R = 1, T = 2, B = 3;
	TL = 0, TR = 1, BL = 2, BR = 3;

	r1sides = [this.Left(), this.Right(), this.Top(), this.Bottom()];
	r2sides = [rect.Left(), rect.Right(), rect.Top(), rect.Bottom()];
	r1verts = [this.TopLeft(), this.TopRight(), this.BotLeft(), this.BotRight()];
	r2verts = [rect.TopLeft(), rect.TopRight(), rect.BotLeft(), rect.BotRight()];

	var vertsInRect = 0;
	for (var i = 0; i < 4; i++)
		if (this.ContainsPoint(r2verts[i]))
			vertsInRect++;

	//if only 1 or 2 vertices is contained in the rectangle than it must be intersecting
	//and therefore the distance is 0
	if (vertsInRect === 1 || vertsInRect === 2) return 0; 
	else if (vertsInRect === 4 || (vertsInRect === 0 && rect.ContainsWholeRect(this)))
	{
		var dists = [];
		dists[0] = Math.abs(r1sides[L] - r2sides[L]);
		dists[1] = Math.abs(r1sides[R] - r2sides[R]);
		dists[2] = Math.abs(r1sides[T] - r2sides[T]);
		dists[3] = Math.abs(r1sides[B] - r2sides[B]);

		var min = 999999;
		for (var i = 0; i < 4; i++)
			if (dists[i] < min) min = dists[i];

		return min;
	}

	if (r2sides[T] <= r1sides[T] && r2sides[B] >= r1sides[B])
	{
		if (r2sides[R] <= r1sides[R] && r2sides[R] >= r1sides[L])
			return 0;
		if (r2sides[L] <= r1sides[R] && r2sides[L] >= r1sides[L])
			return 0;
	}
	else if (r2sides[R] >= r1sides[R] && r2sides[L] <= r1sides[L])
	{
		if (r2sides[T] >= r1sides[T] && r2sides[T] <= r1sides[B])
			return 0;
		if (r2sides[B] >= r1sides[T] && r2sides[B] <= r1sides[B])
			return 0;
	}

	if (r2sides[R] < r1sides[L])
	{
		if (r2sides[B] < r1sides[T])
			return Vec2.Distance(r1verts[TL], r2verts[BR]);
		else if (r2sides[T] > r1sides[B])
			return Vec2.Distance(r1verts[BL], r2verts[TR]);
		else
			return Math.abs(r1sides[L] - r2sides[R]);
	}
	if (r2sides[L] > r1sides[R])
	{
		if (r2sides[B] < r1sides[T])
			return Vec2.Distance(r1verts[TR], r2verts[BL]);
		else if (r2sides[T] > r1sides[B])
			return Vec2.Distance(r1verts[BR], r2verts[TL]);
		else
			return Math.abs(r1sides[R] - r2sides[L]);	
	}
};

Rectangle.prototype.ContainsPoint = function(vec)
{
	return (vec.x >= this.Left() && vec.x <= this.Right() &&
			vec.y >= this.Top() && vec.y <= this.Bottom());
};

Rectangle.prototype.ContainsRect = function(rect)
{
	return (this.DistToRect(rect) === 0 || this.ContainsWholeRect(rect) || rect.ContainsWholeRect(this));
};

Rectangle.prototype.ContainsWholeRect = function(rect)
{
	return (this.ContainsPoint(rect.TopLeft())  &&
			this.ContainsPoint(rect.TopRight()) &&
			this.ContainsPoint(rect.BotLeft())  &&
			this.ContainsPoint(rect.BotRight()));
};