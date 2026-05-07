using System;

namespace TetrisBlazor.Models
{
    public class Piece
    {
        public char Type { get; set; }
        public int[][] Shape { get; set; }
        public string Color { get; set; }
        public int X { get; set; }
        public int Y { get; set; }

        public Piece(char type)
        {
            Type = type;
            Shape = (int[][])TetrisConstants.SHAPES[type].Clone();
            for (int i = 0; i < Shape.Length; i++)
            {
                Shape[i] = (int[])TetrisConstants.SHAPES[type][i].Clone();
            }
            Color = TetrisConstants.COLORS[type];
            X = 3;
            Y = 0;
        }

        public void Rotate()
        {
            // Transpose
            int size = Shape.Length;
            for (int y = 0; y < size; ++y)
            {
                for (int x = 0; x < y; ++x)
                {
                    (Shape[x][y], Shape[y][x]) = (Shape[y][x], Shape[x][y]);
                }
            }
            // Reverse rows for clockwise
            foreach (var row in Shape)
            {
                Array.Reverse(row);
            }
        }

        public Piece Clone()
        {
            var clone = (Piece)this.MemberwiseClone();
            clone.Shape = (int[][])this.Shape.Clone();
            for (int i = 0; i < this.Shape.Length; i++)
            {
                clone.Shape[i] = (int[])this.Shape[i].Clone();
            }
            return clone;
        }

        public void Move(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}
