Util.CreateInheritance(Player, GameObject);

function Player()
{
    this.GameObject();
    
    this.name = "player";
    
    this.transform.SetParent(root);
    
    this.transform.position.Set(400, 300);
    this.velocity = new Vec2(1, 1);
    
    this.size = new Vec2(64, 64);
    this.origin = new Vec2(-this.size.x * 0.5, -this.size.y * 0.5);
    
    this.image = new Image();
    
    this.rateOfFire = 0.05;
    this.fireTimer = 0.0;
};

Player.prototype.Initialize = function()
{
    this.image.src = "player.png";
};

Player.prototype.Update = function()
{
    if (Input.GetKey(Keys.LEFT))
        this.transform.rotation -= 6 * Time.Delta();
    if (Input.GetKey(Keys.RIGHT))
        this.transform.rotation += 6 * Time.Delta();
        
    this.velocity.x = Math.cos(this.transform.rotation) * 300.0 * Time.Delta();
    this.velocity.y = Math.sin(this.transform.rotation) * 300.0 * Time.Delta();
    
    if (Input.GetKey(Keys.UP))
    {
        this.transform.position.Add(this.velocity);
        if (this.transform.position.x > canvas.width - this.size.x / 2)
            this.transform.position.x = canvas.width - this.size.x / 2;
        if (this.transform.position.x < 0 + this.size.x / 2)
            this.transform.position.x = 0 + this.size.x / 2;
            
        if (this.transform.position.y > canvas.height - this.size.y / 2)
            this.transform.position.y = canvas.height - this.size.y / 2;
        if (this.transform.position.y < 0 + this.size.y / 2)
            this.transform.position.y = 0 + this.size.y / 2;
    }
    
    if (this.fireTimer > 0.0)
        this.fireTimer -= Time.Delta();
        
    if (Input.GetKey(Keys.Z))
    {
        if (this.fireTimer <= 0.0)
        {
            this.fireTimer = this.rateOfFire;
            var edgeOffset = new Vec2(Math.cos(this.transform.rotation) * this.size.x / 2,
                                      Math.sin(this.transform.rotation) * this.size.y / 2);
            ProjectileManager.Add(Vec2.Add(this.transform.position, edgeOffset),
                                  new Vec2(Math.cos(this.transform.rotation),
                                           Math.sin(this.transform.rotation)));
        }
    }
        
    this.transform.BuildMatrix();
};

Player.prototype.Draw = function()
{
    context.save();
    
    this.transform.TransformContext(context);
    context.translate(this.origin.x, this.origin.y);
    
    context.drawImage(this.image, 0, 0);
    
    context.restore();
};