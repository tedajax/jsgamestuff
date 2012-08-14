function Vec2(x, y)
{
    this.x = x;
    this.y = y;
    
    if (this.x == null)
        this.x = 0;
    if (this.y == null)
        this.y = 0;
};

Vec2.prototype.Clone = function(other)
{
    this.x = other.x;
    this.y = other.y;
};

Vec2.prototype.Add = function(other)
{
    this.x += other.x;
    this.y += other.y;

    return this;
};

Vec2.Add = function(v1, v2)
{
    return new Vec2(v1.x + v2.x, v1.y + v2.y);
};

Vec2.prototype.Sub = function(other)
{
    this.x -= other.x;
    this.y -= other.y;

    return this;
};

Vec2.Sub = function(v1, v2)
{
    return new Vec2(v1.x - v2.x, v1.y - v2.y);
};

Vec2.prototype.Mul = function(scalar)
{
    this.x *= scalar;
    this.y *= scalar;

    return this;
};

Vec2.prototype.MulVec = function(vec)
{
    this.x *= vec.x;
    this.y *= vec.y;
};

Vec2.Mul = function(vec, scalar)
{
    return new Vec2(vec.x * scalar, vec.y * scalar);
};

Vec2.MulVec = function(v1, v2)
{
    return new Vec2(v1.x * v2.x, v1.y * v2.y);
};

Vec2.prototype.Div = function(scalar)
{
    this.Mul(1.0 / scalar);

    return this;
};

Vec2.prototype.DivVec = function(vec)
{
    this.x /= vec.x;
    this.y /= vec.y;
};

Vec2.Div = function(vec, scalar)
{
    return Vec2.Mul(vec, 1.0 / scalar);
};

Vec2.DivVec = function(v1, v2)
{
    return new Vec2(v1.x / v2.x, v1.y / v2.y);
};

Vec2.prototype.Magnitude = function()
{
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vec2.prototype.Normalize = function()
{
    this.Div(this.Magnitude());
};

Vec2.prototype.Normalized = function()
{
    var m = this.Magnitude();
    return new Vec2(this.x / m, this.y / m);
};

Vec2.Distance = function(v1, v2)
{
    return Vec2.Sub(v1, v2).Magnitude();
};

Vec2.prototype.Print = function()
{
    console.log(this.x + ", " + this.y);
};

Vec2.prototype.Set = function(x, y)
{
    this.x = x;
    this.y = y;
};

Vec2.prototype.Negate = function()
{
    this.x = -x;
    this.y = -y;
};

Vec2.Negate = function(vec)
{
    return new Vec2(-vec.x, -vec.y);
};

Vec2.prototype.Dot = function(vec)
{
    return this.x * vec.x + this.y * vec.y;
};

Vec2.Dot = function(v1, v2)
{
    return v1.x * v2.x + v1.y * v2.y;
};

Vec2.prototype.Midpoint = function()
{
    return new Vec2(this.x / 2, this.y / 2);
};

Vec2.Midpoint = function(vec)
{
    return new Vec2(vec.x / 2, vec.y / 2);
};

Vec2.prototype.Perpendicular = function()
{
    return new Vec2(-this.y, this.x);
};

Vec2.Perpendicular = function(vec)
{
    return new Vec2(-vec.y, vec.x);
};

Vec2.GetDirectionFromRotation = function(rotation)
{
    return new Vec2(Math.cos(rotation), Math.sin(rotation));
};

Vec2.ZERO = new Vec2(0.0, 0.0);
Vec2.ONE = new Vec2(1.0, 1.0);
Vec2.UNIT_X = new Vec2(1.0, 0.0);
Vec2.UNIT_Y = new Vec2(0.0, 1.0);