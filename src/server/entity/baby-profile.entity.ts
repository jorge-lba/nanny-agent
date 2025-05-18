// Entidade que representa o perfil do bebê seguindo padrão DDD
export class BabyProfile {
  // Propriedades privadas
  private readonly _uuid: string;
  private readonly _name: string;
  private readonly _birthDate: string;
  private readonly _milestones: MilestoneSummary[];

  constructor({ uuid, name, birthDate, milestones = [] }: {
    uuid?: string;
    name: string;
    birthDate: string;
    milestones?: MilestoneSummary[];
  }) {
    this._uuid = uuid || crypto.randomUUID();
    this._name = name;
    this._birthDate = birthDate;
    this._milestones = milestones;
  }

  // Getters
  get uuid(): string {
    return this._uuid;
  }

  get name(): string {
    return this._name;
  }

  get birthDate(): string {
    return this._birthDate;
  }

  get milestones(): MilestoneSummary[] {
    return this._milestones;
  }

  // Método de domínio para adicionar um novo marco
  addMilestone(milestone: MilestoneSummary): BabyProfile {
    return new BabyProfile({
      uuid: this._uuid,
      name: this._name,
      birthDate: this._birthDate,
      milestones: [...this._milestones, milestone]
    });
  }
}

// Value Object para resumo de marcos do bebê
export class MilestoneSummary {
  private readonly _timestamp: string;
  private readonly _data: MilestoneData;

  constructor({ timestamp, data }: { timestamp: string; data: MilestoneData }) {
    this._timestamp = timestamp;
    this._data = data;
  }

  get timestamp(): string {
    return this._timestamp;
  }

  get data(): MilestoneData {
    return this._data;
  }
}

// Value Object para dados do marco
export class MilestoneData {
  private readonly _type: string;
  private readonly _summary: string;

  constructor({ type, summary }: { type: string; summary: string }) {
    this._type = type;
    this._summary = summary;
  }

  get type(): string {
    return this._type;
  }

  get summary(): string {
    return this._summary;
  }
} 