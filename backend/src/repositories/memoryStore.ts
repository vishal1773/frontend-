type MemoryOtp = {
  mobileNumber: string;
  codeHash: string;
  expiresAt: Date;
  consumedAt?: Date | null;
  id: string;
  createdAt: Date;
};

type MemoryRefreshToken = {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt?: Date | null;
  id: string;
  createdAt: Date;
};

const otpStore = new Map<string, MemoryOtp>();
const refreshTokenStore = new Map<string, MemoryRefreshToken>();
const usersByMobile = new Map<string, any>();
const usersById = new Map<string, any>();

export const memoryStore = {
  async upsertUser(user: any) {
    usersByMobile.set(user.mobileNumber, user);
    usersById.set(user.id, user);
    return user;
  },

  async findUserByMobile(mobileNumber: string) {
    return usersByMobile.get(mobileNumber) ?? null;
  },

  async findUserById(id: string) {
    return usersById.get(id) ?? null;
  },

  async createOtp(mobileNumber: string, codeHash: string, expiresAt: Date) {
    const record = {
      id: `${Date.now()}`,
      mobileNumber,
      codeHash,
      expiresAt,
      createdAt: new Date(),
      consumedAt: null,
    };
    otpStore.set(mobileNumber, record);
    return record;
  },

  async findLatestOtp(mobileNumber: string) {
    return otpStore.get(mobileNumber) ?? null;
  },

  async consumeOtp(id: string) {
    const current = Array.from(otpStore.values()).find((entry) => entry.id === id);
    if (current) {
      current.consumedAt = new Date();
      otpStore.set(current.mobileNumber, current);
    }
    return current;
  },

  async createRefreshToken(userId: string, tokenHash: string, expiresAt: Date) {
    const record = {
      id: `${Date.now()}`,
      userId,
      tokenHash,
      expiresAt,
      revokedAt: null,
      createdAt: new Date(),
    };
    refreshTokenStore.set(tokenHash, record);
    return record;
  },

  async findRefreshToken(tokenHash: string) {
    return refreshTokenStore.get(tokenHash) ?? null;
  },

  async revokeAllRefreshTokens(userId: string) {
    for (const [tokenHash, token] of refreshTokenStore.entries()) {
      if (token.userId === userId) {
        token.revokedAt = new Date();
        refreshTokenStore.set(tokenHash, token);
      }
    }
    return { count: 1 };
  },
};
