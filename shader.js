function Shader()
{
	Shader.SHADER_DIR = "Assets/Shaders/";

	this.program;
	this.Initialize();
};

Shader.prototype.Initialize = function ()
{
	var fragmentShader = this.GetFragShader();
	var vertexShader = this.GetVertShader();

	this.program = gl.createProgram();
	gl.attachShader(this.program, vertexShader);
	gl.attachShader(this.program, fragmentShader);
	gl.linkProgram(this.program);

	if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
		alert("Failed to link shader");

	gl.useProgram(this.program);
};

Shader.prototype.GetFragShader = function()
{
	var shaderString = this.FragFileString();

	var shader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(shader, shaderString);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
	{
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
};

Shader.prototype.GetVertShader = function()
{
	var shaderString = this.VertFileString();

	var shader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(shader, shaderString);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
	{
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
};

Shader.prototype.FragFileString = function()
{
	return Util.GetFileString(Shader.SHADER_DIR + "basic-fs.glsl");
};

Shader.prototype.VertFileString = function()
{
	return Util.GetFileString(Shader.SHADER_DIR + "basic-vs.glsl");
};

Shader.prototype.DrawSetup = function()
{

};

Shader.prototype.InitLocales = function()
{

};