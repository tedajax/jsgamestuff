function BoundingCircle(parent, center, radius)
{
	this.transform = new Transform(parent);

    this.transform.position = ((center) ? center : Vec2.ZERO);
    this.radius = ((radius) ? radius : 0);
};

BoundingCircle.prototype.IntersectsCircle = function(circle)
{
	dist = Vec2.Distance(this.transform.position, circle.transform.position);

	return (dist <= this.radius + circle.radius);
};

BoundingCircle.prototype.IntersectsRectangle = function(rectangle)
{

};

BoundingCircle.prototype.DebugDraw = function()
{
	context.save();
    this.transform.TransformContext(context);
    
    context.beginPath();
    context.arc(0, 0, this.size, 0, 2 * Math.PI, false);
    context.lineWidth = 1;
    context.strokeStyle = "rgb(0, 255, 255)";
    context.stroke();
    context.beginPath();
    
    context.restore();
};