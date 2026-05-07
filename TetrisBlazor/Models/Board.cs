using System.Collections.Generic;
using System.Linq;

namespace TetrisBlazor.Models
{
    public class Board
    {
        public string[][] Grid { get; private set; }

        public Board()
        {
            Grid = GetEmptyGrid();
        }

        private string[][] GetEmptyGrid()
        {
            var grid = new string[TetrisConstants.ROWS][];
            for (int i = 0; i < TetrisConstants.ROWS; i++)
            {
                grid[i] = new string[TetrisConstants.COLS];
                for (int j = 0; j < TetrisConstants.COLS; j++)
                {
                    grid[i][j] = string.Empty;
                }
            }
            return grid;
        }

        public bool IsValid(Piece p)
        {
            for (int dy = 0; dy < p.Shape.Length; dy++)
            {
                for (int dx = 0; dx < p.Shape[dy].Length; dx++)
                {
                    if (p.Shape[dy][dx] != 0)
                    {
                        int x = p.X + dx;
                        int y = p.Y + dy;
                        if (x < 0 || x >= TetrisConstants.COLS || y >= TetrisConstants.ROWS || (y >= 0 && !string.IsNullOrEmpty(Grid[y][x])))
                        {
                            return false;
                        }
                    }
                }
            }
            return true;
        }

        public void Freeze(Piece p)
        {
            for (int dy = 0; dy < p.Shape.Length; dy++)
            {
                for (int dx = 0; dx < p.Shape[dy].Length; dx++)
                {
                    if (p.Shape[dy][dx] > 0)
                    {
                        if (p.Y + dy >= 0)
                        {
                            Grid[p.Y + dy][p.X + dx] = p.Color;
                        }
                    }
                }
            }
        }

        public int ClearLines()
        {
            int lines = 0;
            for (int y = TetrisConstants.ROWS - 1; y >= 0; y--)
            {
                if (Grid[y].All(cell => !string.IsNullOrEmpty(cell)))
                {
                    lines++;
                    for (int i = y; i > 0; i--)
                    {
                        Grid[i] = Grid[i - 1];
                    }
                    Grid[0] = new string[TetrisConstants.COLS];
                    for (int j = 0; j < TetrisConstants.COLS; j++)
                    {
                        Grid[0][j] = string.Empty;
                    }
                    y++; // Re-check the same row
                }
            }
            return lines;
        }

        public void Reset()
        {
            Grid = GetEmptyGrid();
        }

        public int GetGhostPosition(Piece p)
        {
            var ghost = p.Clone();
            while (IsValid(ghost))
            {
                ghost.Y++;
            }
            return ghost.Y - 1;
        }
    }
}
