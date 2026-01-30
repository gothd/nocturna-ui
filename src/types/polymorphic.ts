import React from "react";

// 1. Define a prop 'as'
export type AsProp<C extends React.ElementType> = {
  as?: C;
};

// 2. Mescla as props
export type PolymorphicComponentProps<C extends React.ElementType, P = {}> = P &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof (AsProp<C> & P)>;

// 3. Tipagem da Ref
export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>["ref"];

// 4. Interface do Componente (CORRIGIDO)
// Usa interface para permitir adicionar 'displayName' e usa ReactNode no retorno (React 18+)
export interface PolymorphicComponent<P = {}, D extends React.ElementType = "div"> {
  <C extends React.ElementType = D>(
    props: PolymorphicComponentProps<C, P> & { ref?: PolymorphicRef<C> },
  ): React.ReactNode;
  displayName?: string;
}
