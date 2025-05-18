import { ParentProfile } from '../entity/parent-profile.entity';

// Repositório em memória para ParentProfile
export class ParentProfileRepository {
  // Mapa para armazenar os perfis em memória (chave: uuid)
  private profiles: Map<string, ParentProfile> = new Map();

  // Salva ou atualiza um perfil
  save(profile: ParentProfile): void {
    this.profiles.set(profile.uuid, profile);
  }

  // Busca um perfil pelo uuid
  findByUuid(uuid: string): ParentProfile | undefined {
    return this.profiles.get(uuid);
  }

  // Lista todos os perfis
  findAll(): ParentProfile[] {
    return Array.from(this.profiles.values());
  }

  // Remove um perfil pelo uuid
  removeByUuid(uuid: string): void {
    this.profiles.delete(uuid);
  }
} 