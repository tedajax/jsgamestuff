function Panel(w, h, align)
{
    this.width = (w != null) ? w : canvas.width / 3;
    this.height = (h != null) ? h : canvas.height;
    this.align = (align != null) ? align : "right";
    
    this.targetHide = 0;
    this.targetShow = 0;
    
    this.borderWidth = 4;
        
    switch (this.align)
    {
        case "left":
            this.targetHide = -this.width - this.borderWidth;
            this.targetShow = 0;
            break;
        
        case "right":
            this.targetHide = canvas.width + this.borderWidth;
            this.targetShow = canvas.width - this.width - this.borderWidth / 2;
            break;
        
        default:
            return;
    }
       
    this.position = this.targetHide;
    
    this.show = false;
    
    this.fillColor = "rgba(220, 220, 220, 0.5)";
    this.textColor = '#222222';
    
    this.textOffset = new Vec2(10, 25);
    this.lines = new Array();
    this.lineSize = 20;
};

Panel.prototype.Update = function()
{
    if (this.show)
        this.currentTarget = this.targetShow;
    else
        this.currentTarget = this.targetHide;
        
    this.position = Math.lerp(this.position, this.currentTarget, 10.0 * Time.Delta());
}

Panel.prototype.Draw = function()
{
    context.beginPath();
    context.rect(this.position, 0, this.width, this.height);
    context.fillStyle = this.fillColor;
    context.fill();
    context.lineWidth = this.borderWidth;
    context.strokeStyle = 'black';
    context.stroke();

    context.font = "20px helvetica";
    context.fillStyle = '#000000';
    for (var i = 0; i < this.lines.length; i++)
    {
        context.fillText(this.lines[i], this.position + this.textOffset.x, (i * this.lineSize) + this.textOffset.y);
    }
}

Panel.prototype.ToggleShow = function()
{
    this.show = !this.show;
}