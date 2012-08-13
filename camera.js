function Camera()
{
	this.transform = new Transform();
};

Camera.prototype.SetPosition = function(pos)
{
	this.transform.position = Vec2.Negate(pos);
};

Camera.prototype.Move = function(vec)
{
	this.transform.position.Sub(vec);
};

Camera.prototype.Update = function()
{
	this.transform.BuildMatrix();
};

Camera.prototype.ApplyTransform = function()
{
	this.transform.TransformContext(Game.context);
};

Camera.CameraToWorld = function(camera, vec)
{
	return Vec2.Sub(vec, camera.transform.positionwaaaaaaa);
};

Camera.WorldToCamera = function(camera, vec)
{
	return Vec2.Add(vec, camera.transform.position);
};

