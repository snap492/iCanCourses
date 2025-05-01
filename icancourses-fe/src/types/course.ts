// ���� ���������� � �����
export type MaterialType = 'longread' | 'exercise' | 'video' | 'document';

// �������� ������ ��������� �����
export interface CourseMaterial {
    id: string; // ���������� id ���������
    type: MaterialType; // ��� ���������
    title: string; // �������� ���������
    description?: string; // (�����������) ��������
}
