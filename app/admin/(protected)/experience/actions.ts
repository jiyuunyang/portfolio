'use server';

import { getAdminSession } from '@/lib/adminSession';
import {
  createExperience,
  deleteExperience,
  ExperienceInput,
  updateExperience,
} from '@/lib/services/experienceService';
import { revalidatePath } from 'next/cache';

export type ActionResult = { ok: true } | { ok: false; error: string };

async function requireAdmin(): Promise<ActionResult | null> {
  const session = await getAdminSession();
  if (!session) return { ok: false, error: '인증되지 않은 요청입니다.' };
  return null;
}

export async function createExperienceAction(
  id: string,
  input: ExperienceInput,
): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    await createExperience(id, input);
    revalidatePath('/');
    revalidatePath('/admin/experience');
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : '생성에 실패했습니다.',
    };
  }
}

export async function updateExperienceAction(
  id: string,
  input: ExperienceInput,
): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    await updateExperience(id, input);
    revalidatePath('/');
    revalidatePath('/admin/experience');
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : '저장에 실패했습니다.',
    };
  }
}

export async function deleteExperienceAction(
  id: string,
): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    await deleteExperience(id);
    revalidatePath('/');
    revalidatePath('/admin/experience');
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : '삭제에 실패했습니다.',
    };
  }
}
