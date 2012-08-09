//A 3x3 matrix used for storing 2 dimensional world matrices
function Matrix3(m11, m12, m13,
                 m21, m22, m23,
                 m31, m32, m33)
{
    this.m = [[(m11 == null) ? 1 : m11, (m12 == null) ? 0 : m12, (m13 == null) ? 0 : m13],
              [(m21 == null) ? 0 : m21, (m22 == null) ? 1 : m22, (m23 == null) ? 0 : m23],
              [(m31 == null) ? 0 : m31, (m32 == null) ? 0 : m32, (m33 == null) ? 1 : m33]];
};

Matrix3.prototype.Clone = function()
{
    var mat = new Matrix3();
    
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            mat.m[i][j] = this.m[i][j];
            
    return mat;
};

Matrix3.prototype.Copy = function(copy)
{
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            this.m[i][j] = copy.m[i][j];
};

Matrix3.prototype.Add = function(m2)
{
    this.Copy(Matrix3.Add(this, m2));
};

Matrix3.prototype.Mul = function(m2)
{
    this.Copy(Matrix3.Mul(this, m2));
};

Matrix3.Add = function(m1, m2)
{
    var result = Matrix3.ZERO.Clone();
    
    for (var i = 0; i < 3; i++)
        for (var j = 0; j < 3; j++)
            result.m[i][j] = m1.m[i][j] + m2.m[i][j];
            
    return result;
};

Matrix3.Mul = function(m1, m2)
{
    var result = Matrix3.ZERO.Clone();    
    if (m2.m == null || !(m2.m instanceof Array))
    {
        for (var i = 0; i < 3; i++)
            for (var j = 0; j < 3; j++)
                result.m[i][j] = m1.m[i][j] * m2;
    }
    else
    {
        for (var i = 0; i < 3; i++)
        {
            for (var j = 0; j < 3; j++)
            {
                for (var k = 0; k < 3; k++)
                {
                    result.m[i][j] += m1.m[i][k] * m2.m[k][j];
                }
            }
        }
    }
    return result;
};

Matrix3.CreateTranslation = function(t)
{
    var mat = new Matrix3();
    mat.m[0][2] = t.x;
    mat.m[1][2] = t.y;
    return mat;
};

Matrix3.CreateRotation = function(r)
{
    var mat = new Matrix3();
    mat.m[0][0] = Math.cos(r);
    mat.m[0][1] = Math.sin(r);
    mat.m[1][0] = -Math.sin(r);
    mat.m[1][1] = Math.cos(r);
    return mat;
};

Matrix3.CreateScale = function(s)
{
    var mat = new Matrix3();
    mat.m[0][0] = s.x;
    mat.m[1][1] = s.y;
    return mat;
};

Matrix3.prototype.Print = function()
{
    for (var i = 0; i < 3; i++)
        console.log(this.m[i][0] + " " + this.m[i][1] + " " + this.m[i][2]);
    console.log(" ");
};

Matrix3.IDENTITY = new Matrix3(1, 0, 0,
                               0, 1, 0,
                               0, 0, 1);

Matrix3.ZERO = new Matrix3(0, 0, 0,
                           0, 0, 0,
                           0, 0, 0);

Matrix3.ONE = new Matrix3(1, 1, 1,
                          1, 1, 1,
                          1, 1, 1);
