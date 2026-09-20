import { Router, Response } from 'express';
import { prisma } from '../prisma.js';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Protect all resume routes with JWT middleware
router.use(authenticateToken);

// GET /api/resumes - Fetch all resumes for logged-in user
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const resumes = await prisma.resume.findMany({
      where: { userId },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    res.json({ resumes });
  } catch (err: any) {
    console.error('Fetch resumes error:', err);
    res.status(500).json({ error: 'Failed to fetch saved resumes' });
  }
});

// GET /api/resumes/:id - Get specific resume by ID
router.get('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const id = req.params.id as string;

    const resume = await prisma.resume.findFirst({
      where: { id, userId },
    });

    if (!resume) {
      res.status(404).json({ error: 'Resume not found' });
      return;
    }

    res.json({
      id: resume.id,
      title: resume.title,
      data: JSON.parse(resume.data),
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    });
  } catch (err: any) {
    console.error('Fetch resume detail error:', err);
    res.status(500).json({ error: 'Failed to fetch resume details' });
  }
});

// POST /api/resumes - Create new resume
router.post('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { title, data } = req.body;

    if (!title || !data) {
      res.status(400).json({ error: 'Resume title and data are required' });
      return;
    }

    const jsonString = typeof data === 'string' ? data : JSON.stringify(data);

    const resume = await prisma.resume.create({
      data: {
        title,
        data: jsonString,
        userId,
      },
    });

    res.status(201).json({
      id: resume.id,
      title: resume.title,
      data: JSON.parse(resume.data),
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    });
  } catch (err: any) {
    console.error('Create resume error:', err);
    res.status(500).json({ error: 'Failed to save resume' });
  }
});

// PUT /api/resumes/:id - Update resume
router.put('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const id = req.params.id as string;
    const { title, data } = req.body;

    const existing = await prisma.resume.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      res.status(404).json({ error: 'Resume not found' });
      return;
    }

    const jsonString = data ? (typeof data === 'string' ? data : JSON.stringify(data)) : existing.data;

    const updated = await prisma.resume.update({
      where: { id },
      data: {
        title: title || existing.title,
        data: jsonString,
      },
    });

    res.json({
      id: updated.id,
      title: updated.title,
      data: JSON.parse(updated.data),
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  } catch (err: any) {
    console.error('Update resume error:', err);
    res.status(500).json({ error: 'Failed to update resume' });
  }
});

// DELETE /api/resumes/:id - Delete resume
router.delete('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const id = req.params.id as string;

    const existing = await prisma.resume.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      res.status(404).json({ error: 'Resume not found' });
      return;
    }

    await prisma.resume.delete({
      where: { id },
    });

    res.json({ message: 'Resume deleted successfully' });
  } catch (err: any) {
    console.error('Delete resume error:', err);
    res.status(500).json({ error: 'Failed to delete resume' });
  }
});

export default router;
