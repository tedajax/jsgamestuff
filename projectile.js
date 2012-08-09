function Projectile()
{
    this.position = new Vec2(0, 0);
    this.velocity = new Vec2(0, 0);
    this.speed = 10.0;
    this.radius = 4;
    this.direction = new Vec2(0, 0);
    this.destroy = false;
};

Projectile.prototype.update = function()
{
    this.velocity = Vec2.Mul(this.direction, this.speed);
    this.position.Add(this.velocity);
    
    if (this.position.x > canvas.width + this.radius ||
        this.position.x < 0 - this.radius ||
        this.position.y > canvas.height + this.radius ||
        this.position.y < 0 - this.radius)
    {
        this.destroy = true;
    }
};

Projectile.prototype.draw = function()
{
    //context.save();
    //
    //context.translate(this.position.x, this.position.y);
    //context.rotate(this.rotation);
    //context.scale(1, 1);
    
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
    context.fillStyle = "#FF0000";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
    
    //context.restore();
};