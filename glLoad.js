function GL(canvas)
{
	GL.ctx = canvas.getContext("experimental-webgl");

	if (!GL.ctx)
		alert("Failed to initialize WebGL");

	GL.viewportWidth = canvas.width;
	GL.viewportHeight = canvas.height;

	GL.model = Matrix.I(4);
	GL.view = Matrix.I(4);
	GL.projection = Matrix.I(4);

	GL.modelView = Matrix.I(4);
};

