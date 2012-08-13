function Game()
{
	Game.canvas = null;
	Game.context = null;

	Game.camera = null;
};

Game.Init = function()
{
	Game.canvas = document.getElementById("canvas");
	Game.context = Game.canvas.getContext("2d");

	Game.camera = new Camera();
	Game.camera.Move(new Vec2(-Game.canvas.width / 2, -Game.canvas.height / 2));
};

Game();