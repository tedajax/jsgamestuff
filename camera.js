function Camera()
{
	this.transform = new Transform();
};

Camera.prototype.ApplyTransform = function()
{
	this.transform.TransformContext(context);
};

