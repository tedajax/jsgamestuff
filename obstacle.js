Util.CreateInheritance(Obstacle, GameObject);

function Obstacle()
{
    this.GameObject();
    
    this.size = 32;
}

Obstacle.prototype.Initialize = function()
{
    
}

Obstacle.prototype.Update = function()
{
    this.transform.BuildMatrix();
}

Obstacle.prototype.Draw = function()
{
    context.save();
    this.transform.TransformContext(context);
    
    context.beginPath();
    context.arc(0, 0, this.size, 0, 2 * Math.PI, false);
    context.fillStyle = "#4444FF";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
    context.beginPath();
    context.arc(10, 0, 5, 0, 2 * Math.PI, false);
    context.fillStyle = "#FFFFFF";
    context.fill();
    
    context.restore();
}