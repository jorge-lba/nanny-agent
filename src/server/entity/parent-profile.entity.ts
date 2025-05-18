// Entidade que representa o perfil dos pais seguindo padrão DDD
import { BabyProfile } from './baby-profile.entity';

export class ParentProfile {
  // Propriedades privadas
  private readonly _uuid: string;
  private readonly _name: string;
  private readonly _birthDate: string;
  private readonly _aboutMe: string;
  private _memories: MemorySummary[];
  private _babies: BabyProfile[];

  constructor({ uuid, name, birthDate, aboutMe, memories = [], babies = [] }: {
    uuid?: string;
    name: string;
    birthDate: string;
    aboutMe: string;
    memories?: MemorySummary[];
    babies?: BabyProfile[];
  }) {
    this._uuid = uuid || crypto.randomUUID();
    this._name = name;
    this._birthDate = birthDate;
    this._aboutMe = aboutMe;
    this._memories = memories;
    this._babies = babies;
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

  get aboutMe(): string {
    return this._aboutMe;
  }

  get memories(): MemorySummary[] {
    return this._memories;
  }

  get babies(): BabyProfile[] {
    return this._babies;
  }
  // Exemplo de método de domínio para adicionar um novo resumo de perfil
  addMemorySummary(memorySummary: MemorySummary): ParentProfile {
    return new ParentProfile({
      uuid: this._uuid,
      name: this._name,
      birthDate: this._birthDate,
      aboutMe: this._aboutMe,
      memories: [...this._memories, memorySummary]
    });
  }

  // Método de domínio para adicionar um novo perfil de bebê
  addBabyProfile(babyProfile: BabyProfile): void {
    this._babies = [...this._babies, babyProfile];
  }
}

// Value Object para resumo de perfil de interação
export class MemorySummary {
  private readonly _timestamp: string;
  private readonly _data: MemoryData;

  constructor({ timestamp, data }: { timestamp: string; data: MemoryData }) {
    this._timestamp = timestamp;
    this._data = data;
  }

  get timestamp(): string {
    return this._timestamp;
  }

  get data(): MemoryData {
    return this._data;
  }
}

// Value Object para dados do resumo de perfil
export class MemoryData {
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

// O campo "profiles" armazena resumos das conversas que determinam fatos importantes para personalizar a interação para o usuário. 