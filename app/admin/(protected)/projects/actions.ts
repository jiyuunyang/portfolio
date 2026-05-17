'use server';

import { getAdminSession } from '@/lib/adminSession';
import {
  createProject,
  deleteProject,
  ProjectInput,
  updateProject,
} from '@/lib/services/projectService';
import { revalidatePath } from 'next/cache';

export type ActionResult = { ok: true } | { ok: false; error: string };

async function requireAdmin(): Promise<ActionResult | null> {
  const session = await getAdminSession();
  if (!session) return { ok: false, error: '인증되지 않은 요청입니다.' };
  return null;
}

export async function createProjectAction(
  projectId: string,
  input: ProjectInput,
): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    await createProject(projectId, input);
    revalidatePath('/');
    revalidatePath('/admin/projects');
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : '생성에 실패했습니다.',
    };
  }
}

export async function updateProjectAction(
  projectId: string,
  input: ProjectInput,
): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    await updateProject(projectId, input);
    revalidatePath('/');
    revalidatePath(`/projects/${projectId}`);
    revalidatePath('/admin/projects');
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : '저장에 실패했습니다.',
    };
  }
}

export async function deleteProjectAction(
  projectId: string,
): Promise<ActionResult> {
  const denied = await requireAdmin();
  if (denied) return denied;
  try {
    await deleteProject(projectId);
    revalidatePath('/');
    revalidatePath('/admin/projects');
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : '삭제에 실패했습니다.',
    };
  }
}
