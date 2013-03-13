function SelectionBox()
{
	this.rect = new Rectangle(0, 0, 0, 0);
	this.storedCameraPosition = Vec2.ZERO;
	this.origin = Vec2.ZERO;
	this.capturedObjects = [];
};

SelectionBox.prototype.Update = function()
{
	if (Input.GetMouseButtonDown(MouseButton.LEFT))
	{
		this.rect.x = Input.GetWorldMouseX();
		this.rect.y = Input.GetWorldMouseY();

		this.origin = new Vec2(this.rect.x, this.rect.y);

		this.storedCameraPosition.x = -Game.camera.transform.position.x;
		this.storedCameraPosition.y = -Game.camera.transform.position.y;
	}

	if (Input.GetMouseButton(MouseButton.LEFT))
	{
		this.rect.width = Input.GetWorldMouseX() - this.rect.x;
		this.rect.height = Input.GetWorldMouseY() - this.rect.y;

		this.rect.x = this.origin.x + (-Game.camera.transform.position.x - this.storedCameraPosition.x);
		this.rect.y = this.origin.y + (-Game.camera.transform.position.y - this.storedCameraPosition.y);
	}

	if (Input.GetMouseButtonUp(MouseButton.LEFT))
	{
		for (var i = 0, len = actors.length; i < len; i++)
			actors[i].selected = this.rect.ContainsRect(actors[i].bounds);
	}
};

SelectionBox.prototype.Draw = function()
{
	if (Input.GetMouseButton(MouseButton.LEFT))
	{
		Game.context.beginPath();
        //Game.context.rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        Game.context.rect(this.rect.Left(), this.rect.Top(),
        			 this.rect.Right() - this.rect.Left(),
        			 this.rect.Bottom() - this.rect.Top());
        Game.context.lineWidth = 1;
        Game.context.strokeStyle = "rgba(0, 255, 0, 1)";
        Game.context.stroke();
	}
};