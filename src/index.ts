// Estilos Globais
import "./styles/globals.css";

// Tipagens
import "./types/window";

// Componentes com Aliases (Nome Temático + Nome Genérico)
export {
  GrimoireAccordion as Accordion,
  GrimoireAccordion,
} from "./components/Accordion";
export { SigilBadge as Badge, SigilBadge } from "./components/Badge";
export { VoidButton as Button, VoidButton } from "./components/Button";
export { NocturnaCard as Card, NocturnaCard } from "./components/Card";
export { HexCheckbox as Checkbox, HexCheckbox } from "./components/Checkbox";
export { VeinInput as Input, VeinInput } from "./components/Input";
export { AltarMenu, AltarMenu as Menu } from "./components/Menu";
export { CryptModal, CryptModal as Modal } from "./components/Modal";
export {
  VesselProgress as Progress,
  VesselProgress,
} from "./components/Progress";
export { AbyssScroll, AbyssScroll as Scroll } from "./components/Scroll";
export { RitualSelect, RitualSelect as Select } from "./components/Select";
export {
  AbyssSeparator,
  AbyssSeparator as Separator,
} from "./components/Separator";
export {
  SpectreSkeleton as Skeleton,
  SpectreSkeleton,
  SpectreSkeletonAvatar,
  SpectreSkeletonCard,
  SpectreSkeletonLine,
} from "./components/Skeleton";
export { SoulTabs, SoulTabs as Tabs } from "./components/Tabs";
export { OmenToast, OmenToast as Toast } from "./components/Toast";
export { RuneTooltip, RuneTooltip as Tooltip } from "./components/Tooltip";

// Providers e Hooks
export {
  OmenToastProvider,
  OmenToastProvider as ToastProvider,
  useToast,
} from "./providers/ToastProvider";

// Utilitários
export { cn } from "./utils/cn";
