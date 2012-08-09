function SelectionBox()
{
	this.rect = new Rectangle(0, 0, 0, 0);

	this.capturedObjects = [];
};

SelectionBox.prototype.Update = function()
{
	if (Input.GetMouseButtonDown(MouseButton.LEFT))
	{
		this.rect.x = Input.GetMouseX();
		this.rect.y = Input.GetMouseY();
	}

	if (Input.GetMouseButton(MouseButton.LEFT))
	{
		this.rect.width = Input.GetMouseX() - this.rect.x;
		this.rect.height = Input.GetMouseY() - this.rect.y;
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
		context.beginPath();
        //context.rect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
        context.rect(this.rect.Left(), this.rect.Top(),
        			 this.rect.Right() - this.rect.Left(),
        			 this.rect.Bottom() - this.rect.Top());
        context.lineWidth = 1;
        context.strokeStyle = "rgba(0, 255, 0, 1)";
        context.stroke();
	}
};