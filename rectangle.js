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
	//TODO: cache the sides instead of making the function calls to calculate the side locations

	TL = 0, TR = 1, BL = 2, BR = 3;

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
		dists[0] = Math.abs(this.Left() - rect.Left());
		dists[1] = Math.abs(this.Right() - rect.Right());
		dists[2] = Math.abs(this.Top() - rect.Top());
		dists[3] = Math.abs(this.Bottom() - rect.Bottom());

		var min = 999999;
		for (var i = 0; i < 4; i++)
			if (dists[i] < min) min = dists[i];

		return min;
	}

	//TODO: this condition is totally wrong
	if (rect.Top() <= this.Top() && rect.Bottom() >= this.Bottom())
	{
		if (rect.Right() <= this.Right() && rect.Right() >= this.Left())
			return 0;
		if (rect.Left() <= this.Right() && rect.Left() >= this.Left())
			return 0;
	}
	else if (rect.Right() >= this.Right() && rect.Left() <= this.Left())
	{
		if (rect.Top() >= this.Top() && rect.Top() <= this.Bottom())
			return 0;
		if (rect.Bottom() >= this.Top() && rect.Bottom() <= this.Bottom())
			return 0;
	}

	if (rect.Right() < this.Left())
	{
		if (rect.Bottom() < this.Top())
			return Vec2.Distance(r1verts[TL], r2verts[BR]);
		else if (rect.Top() > this.Bottom())
			return Vec2.Distance(r1verts[BL], r2verts[TR]);
		else
			return Math.abs(this.Left() - rect.Right());
	}
	if (rect.Left() > this.Right())
	{
		if (rect.Bottom() < this.Top())
			return Vec2.Distance(r1verts[TR], r2verts[BL]);
		else if (rect.Top() > this.Bottom())
			return Vec2.Distance(r1verts[BR], r2verts[TL]);
		else
			return Math.abs(this.Right() - rect.Left());	
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