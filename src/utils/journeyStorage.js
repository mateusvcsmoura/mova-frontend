const JOURNEY_STORAGE_KEY = "mova_journey_flow";

const EMPTY_STEP = {
  garageId: "",
  garageName: "",
  garageAddress: "",
  garageInfo: "",
  date: "",
  time: "",
};

const EMPTY_JOURNEY = {
  retirada: { ...EMPTY_STEP },
  devolucao: { ...EMPTY_STEP },
};

function readRawJourney() {
  if (typeof window === "undefined") {
    return EMPTY_JOURNEY;
  }

  try {
    const stored = window.sessionStorage.getItem(JOURNEY_STORAGE_KEY);
    if (!stored) {
      return EMPTY_JOURNEY;
    }

    const parsed = JSON.parse(stored);
    return {
      retirada: { ...EMPTY_STEP, ...(parsed?.retirada ?? {}) },
      devolucao: { ...EMPTY_STEP, ...(parsed?.devolucao ?? {}) },
    };
  } catch {
    return EMPTY_JOURNEY;
  }
}

function writeRawJourney(nextJourney) {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(JOURNEY_STORAGE_KEY, JSON.stringify(nextJourney));
}

export function getJourneyStep(section) {
  return readRawJourney()[section] ?? { ...EMPTY_STEP };
}

export function updateJourneyStep(section, stepValues) {
  const currentJourney = readRawJourney();
  const nextJourney = {
    ...currentJourney,
    [section]: {
      ...currentJourney[section],
      ...stepValues,
    },
  };

  writeRawJourney(nextJourney);
  return nextJourney[section];
}
