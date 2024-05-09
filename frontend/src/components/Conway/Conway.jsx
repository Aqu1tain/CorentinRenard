import React, { useState, useEffect } from "react";
import { useKey } from "react-use";

import './Conway.scss';

const nextGeneration = (grid, numToDie, numToLive) => {
    const newGrid = Array.from(
        { length: grid.length },
        () => Array.from({ length: grid[0].length }, () => [false, 'transparent'])
    );

    for (let lineIndex = 0; lineIndex < grid.length; lineIndex++) {
        for (let columnIndex = 0; columnIndex < grid[0].length; columnIndex++) {
            const [isAlive, color] = grid[lineIndex][columnIndex];
            const numberOfAliveCellsAround =
                getNumberOfAliveCellsAround(grid, lineIndex, columnIndex);
            if (isAlive) {
                if (numberOfAliveCellsAround < numToDie) {
                    newGrid[lineIndex][columnIndex] = [false, 'transparent'];
                } else if (numberOfAliveCellsAround > numToLive) {
                    newGrid[lineIndex][columnIndex] = [false, 'transparent'];
                } else {
                    newGrid[lineIndex][columnIndex] = [true, color];
                }
            } else {
                if (numberOfAliveCellsAround === numToLive) {
                    newGrid[lineIndex][columnIndex] = [true, 'var(--textaccent)'];
                }
            }
        }
    }
    return newGrid;
}

const getNumberOfAliveCellsAround = (grid, lineIndex, columnIndex) => {
    let numberOfAliveCells = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            const line = (lineIndex + i + grid.length) % grid.length;
            const column = (columnIndex + j + grid[0].length) % grid[0].length;
            const [isAlive] = grid[line][column];
            if (isAlive) {
                numberOfAliveCells++;
            }
        }
    }
    return numberOfAliveCells;
}

const Conway = () => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [numberOfLines, setNumberOfLines] = useState(0);
    const [numberOfColumns, setNumberOfColumns] = useState(0);
    const [cellSize, setCellSize] = useState(Math.floor(window.outerWidth * 0.025));
    const [grid, setGrid] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(100); // Initial speed: 100 milliseconds
    const [numToDie, setNumToDie] = useState(2);
    const [numToLive, setNumToLive] = useState(3);

    useKey(
        " ",
        () => {
            setIsPlaying(prevIsPlaying => !prevIsPlaying);
        },
        { event: 'keydown', ignoreEventsCondition: (event) => event.target.tagName === 'INPUT' }
    );

    useEffect(() => {
        const gameOfLife = document.querySelector(".game-of-life");
        const resizeObserver = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setWidth(width);
            setHeight(height);
        });
        resizeObserver.observe(gameOfLife);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        setNumberOfLines(Math.floor(Math.floor(height) / cellSize));
        setNumberOfColumns(Math.floor(Math.floor(width) / cellSize));
    }, [width, height, cellSize]);

    useEffect(() => {
        const newGrid = Array.from({ length: numberOfLines }, () =>
            Array.from({ length: numberOfColumns }, () => [false, 'transparent'])
        );
        setGrid(newGrid);
    }, [numberOfLines, numberOfColumns]);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setGrid(prevGrid => nextGeneration(prevGrid, numToDie, numToLive));
            }, speed);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPlaying, speed, numToDie, numToLive]);


    const toggleCell = (lineIndex, columnIndex) => {
        const newGrid = [...grid];
        const [isAlive, color] = newGrid[lineIndex][columnIndex];
        newGrid[lineIndex][columnIndex] = [!isAlive, isAlive ? 'transparent' : 'var(--textaccent)'];
        setGrid(newGrid);
    }

    const handlePlayPause = () => {
        setIsPlaying(prevIsPlaying => !prevIsPlaying);
    }

    const handleSpeedChange = (e) => {
        setSpeed(parseInt(e.target.value));
    }

    const handleNumToDieChange = (e) => {
        setNumToDie(parseInt(e.target.value));
    }

    const handleNumToLiveChange = (e) => {
        setNumToLive(parseInt(e.target.value));
    }
    // State variable to keep track of mouse drag state
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = () => {
        setIsDragging(true);
    }

    const handleMouseUp = () => {
        setIsDragging(false);
    }

    // Function to handle cell toggling while dragging
    const handleCellToggleDrag = (lineIndex, columnIndex) => {
        if (isDragging) {
            toggleCell(lineIndex, columnIndex);
        }
    }

    const renderGrid = () => {
        return grid.map((line, lineIndex) => (
            <div className="line" key={lineIndex}>
                {line.map(([isAlive, color], columnIndex) => (
                    <div
                        className="cell"
                        key={columnIndex}
                        style={{ width: `${cellSize}px`, height: `${cellSize}px`, backgroundColor: color }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseEnter={() => handleCellToggleDrag(lineIndex, columnIndex)}
                    ></div>
                ))}
            </div>
        ))
    }

    const handleClearGrid = () => {
        const newGrid = Array.from({ length: numberOfLines }, () =>
            Array.from({ length: numberOfColumns }, () => [false, 'transparent'])
        );
        setGrid(newGrid);
    }

    useEffect(() => {
    // Function to display "404" on the grid
    const display404 = () => {
        const message = "404";
        const centerColumn = Math.floor(numberOfColumns / 2);
        const centerLine = Math.floor(numberOfLines / 2);
        const fontSize = 5; // Adjust the font size as needed

        // Create a new grid
        const newGrid = Array.from({ length: numberOfLines }, () =>
            Array.from({ length: numberOfColumns }, () => [false, 'transparent'])
        );

        // Define the characters' patterns
        const charPatterns = {
            "0": [[true, true, true], [true, false, true], [true, false, true], [true, true, true]],
            "4": [[true, false, true], [true, false, true], [true, true, true], [false, false, true]],
        };

        // Calculate the starting position of the text
        const startX = centerColumn - Math.floor((message.length * fontSize) / 2);

        // Iterate over each character in the message
        for (let i = 0; i < message.length; i++) {
            const currentChar = message.charAt(i);
            const pattern = charPatterns[currentChar];

            // Calculate the starting position of the current character
            const charStartX = startX + i * fontSize;

            // Iterate over the pattern of the current character
            for (let y = 0; y < pattern.length; y++) {
                for (let x = 0; x < pattern[y].length; x++) {
                    // Check if the current cell is within the bounds of the character pattern
                    const cellX = charStartX + x;
                    const cellY = centerLine - Math.floor(pattern.length / 2) + y;

                    // Ensure the cell is within the grid bounds
                    if (cellX >= 0 && cellX < numberOfColumns && cellY >= 0 && cellY < numberOfLines) {
                        if (pattern[y][x]) {
                            // Set the cell as active if it falls within the pattern
                            newGrid[cellY][cellX] = [true, 'var(--textaccent)'];
                        }
                    }
                }
            }
        }

        setGrid(newGrid);
    };

    display404();
}, [numberOfLines, numberOfColumns]);


    return (
        <div className="game-of-life">
            <div className="grid">{renderGrid()}</div>
            <div className="debug">
                <p>Width: {width}px</p>
                <p>Height: {height}px</p>
                <p>Number of lines: {numberOfLines}</p>
                <p>Number of columns: {numberOfColumns}</p>
                <p>Cell Size: <input type="range" min="10" max="50" step="1" value={cellSize} onChange={(e) => setCellSize(e.target.value)}></input></p>
                <p>Speed: <input type="range" min="50" max="500" step="50" value={speed} onChange={handleSpeedChange}></input></p>
                <p>Number to Die: <input type="number" value={numToDie} onChange={handleNumToDieChange}></input></p>
                <p>Number to Live: <input type="number" value={numToLive} onChange={handleNumToLiveChange}></input></p>
                <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
                <button onClick={handleClearGrid}>Clear grid</button>
            </div>
        </div>
    )
}

export default Conway;
