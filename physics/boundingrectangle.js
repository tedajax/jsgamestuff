function BoundingRectangle(parent, center, bounds)
{
	this.transform = new Transform(parent);

	this.transform.position = ((center) ? center : Vec2.ZERO);
	this.bounds = ((bounds) ? bounds : Vec2.ZERO);

	x = this.transform.LocalToWorld(this.transform.position) - this.bounds.x / 2;
	y = this.transform.LocalToWorld(this.transform.position) - this.bounds.y / 2;
	this.rect = new Rectangle(x, y, this.bounds.x, this.bounds.y);
};

BoundingRectangle.prototype.IntersectsRectangle = function(rectangle)
{
	return this.rect.ContainsRect(rectangle.rect);
};

BoundingRectangle.prototype.IntersectsCircle = function(circle)
{
	inflatedRect = new Rectangle(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
	
	inflatedRect.x -= circle.radius;
	inflatedRect.y -= circle.radius;
	inflatedRect.width += circle.radius * 2;
	inflatedRect.height += circle.radius * 2;

	return inflatedRect.ContainsPoint(circle.transform.LocalToWorld());
};