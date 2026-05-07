using System.Collections.Generic;

namespace TetrisBlazor.Models
{
    public static class TetrisConstants
    {
        public const int COLS = 10;
        public const int ROWS = 20;
        public const int BLOCK_SIZE = 30;

        public static readonly Dictionary<char, int[][]> SHAPES = new Dictionary<char, int[][]>
        {
            ['I'] = new int[][] {
                new int[] { 0, 0, 0, 0 },
                new int[] { 1, 1, 1, 1 },
                new int[] { 0, 0, 0, 0 },
                new int[] { 0, 0, 0, 0 }
            },
            ['J'] = new int[][] {
                new int[] { 1, 0, 0 },
                new int[] { 1, 1, 1 },
                new int[] { 0, 0, 0 }
            },
            ['L'] = new int[][] {
                new int[] { 0, 0, 1 },
                new int[] { 1, 1, 1 },
                new int[] { 0, 0, 0 }
            },
            ['O'] = new int[][] {
                new int[] { 1, 1 },
                new int[] { 1, 1 }
            },
            ['S'] = new int[][] {
                new int[] { 0, 1, 1 },
                new int[] { 1, 1, 0 },
                new int[] { 0, 0, 0 }
            },
            ['T'] = new int[][] {
                new int[] { 0, 1, 0 },
                new int[] { 1, 1, 1 },
                new int[] { 0, 0, 0 }
            },
            ['Z'] = new int[][] {
                new int[] { 1, 1, 0 },
                new int[] { 0, 1, 1 },
                new int[] { 0, 0, 0 }
            }
        };

        public static readonly Dictionary<char, string> COLORS = new Dictionary<char, string>
        {
            ['I'] = "cyan",
            ['J'] = "blue",
            ['L'] = "orange",
            ['O'] = "yellow",
            ['S'] = "green",
            ['T'] = "purple",
            ['Z'] = "red"
        };

        public static class Points
        {
            public const int SINGLE = 100;
            public const int DOUBLE = 300;
            public const int TRIPLE = 500;
            public const int TETRIS = 800;
        }
    }
}
