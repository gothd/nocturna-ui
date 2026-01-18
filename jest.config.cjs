module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    // Mocka importações de CSS (ex: import './styles/globals.css')
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // Mocka alias de caminhos (se estiver usando @/ no tsconfig)
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    // Usa o babel-jest para arquivos .js, .jsx, .ts e .tsx
    "^.+\\.(t|j)sx?$": "babel-jest",
  },
  // Ignora node_modules, exceto se alguma lib específica precisar de transpilação (raro)
  transformIgnorePatterns: ["/node_modules/"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  // -- COVERAGE --
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}", // Olha para os componentes
    "src/providers/**/*.{ts,tsx}", // Olha para os providers
    "!src/**/index.ts", // Ignora barrels locais se houver
    "!src/**/*.d.ts", // Ignora definições
  ],
  coverageDirectory: "coverage",
};
