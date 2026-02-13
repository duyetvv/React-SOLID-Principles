import type { ILogger } from '../types';

/**
 * @description A simple logger component that adheres to the ILogger interface.
 * It's a dependency that other components can use, illustrating how clients
 * should depend on abstractions (interfaces) rather than concrete implementations.
 *
 * @param logger - An object that implements the ILogger interface.
 */
export const Logger = ({ logger }: { logger: ILogger }) => {
  const handleClick = () => {
    logger.log('This is a test log from the Logger component.');
  };

  return (
    <button onClick={handleClick}>
      Test Logger
    </button>
  );
};
