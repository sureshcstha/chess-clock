# Chess Clock
A simple and interactive Chess Clock application built with React. This app provides an intuitive interface for tracking time during chess games or similar turn-based activities.

## Demo
![Chess Clock Screenshot](/src/assets/screenshot.png "This shows screenshot of the app interface")

## Features
1. Preset Timer Selection:
    * Users can select preset times (e.g., 1 minute, 3 minutes, 5 minutes, etc.).
    * This sets the countdown timer for both players.
2. Player-Specific Timers:
    * Each player has their own countdown timer displayed in `PlayerClock` components.
    * The active player's timer counts down, while the inactive player's timer pauses.
3. Player Switching Turns:
    * Players can switch turns by clicking their timer when it is active.
    * Clicking increments the player's move count and switches the active player.
4. Start, Pause, and Reset:
    * Users can start or pause the game using a control button.
    * Resetting the game resets both timers, move counts, and the active player.
5. Game Over Alert:
    * If either player’s time reaches `0`, the game stops, and a SweetAlert popup notifies users.
    * The popup offers options to reset the game.

## Tech Stack
* React: For building the user interface.
* Tailwind CSS: For styling the components.
* SweetAlert2: For displaying interactive alerts.

## How the App Works:
1. Starting the Game:
    * The user selects a preset time (default is 10 minutes).
    * Clicking the "Start" button activates Player 1’s timer and begins the countdown.
2. Switching Turns:
    * The active player clicks their timer when their move ends.
    * The game switches to the other player, pausing the first player’s timer and starting the other’s.
3. Pausing the Game:
    * Users can pause the game using the "Pause" button, halting both timers.
4. Resetting the Game:
    * Users can reset the game, which clears move counts, resets timers to the preset, and pauses the game.
5. Endgame Notification:
    * If a player’s timer hits `0`, a SweetAlert popup notifies the user, halting the game.

## UI Components:
1. PlayerClock:
    * Displays:
        * Player name.
        * Remaining time (formatted as `MM:SS`).
        * Number of moves.
    * Highlights the active player.
    * Switches turns when clicked.
2. Control Buttons:
    * __Start/Pause__: Toggles the game status.
    * __Reset__: Confirms and resets the game.
3. Preset Times Buttons:
    * Allows users to select preset times before starting the game.

## File Breakdown:
1. `ChessClock.jsx`:
    * State Management:
        * Tracks preset time, player-specific times, active player, move counts, and game status (`isRunning`).
    * Timer Logic:
        * A `setInterval` decreases the active player’s timer every second.
        * Stops when the game is paused or the timer reaches 0.
    * Player Switching:
        * Updates the active player and increments their move count.
    * Alerts and Resets:
        * Uses `SweetAlert2` to display alerts when a player's time is up or on reset confirmation.
2. `PlayerClock.jsx`:
    * Represents each player's timer UI.
    * Highlights the active player using a different background color.
    * Allows the active player to switch turns by clicking their timer.
3. `App.jsx`:
    * Serves as the root of the application and renders the `ChessClock` component.

## Future Improvements
* Add sound effects for time-up and turn switches.
* Allow users to input custom timer durations.

## Contributing
Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.